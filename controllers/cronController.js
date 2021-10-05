const cron = require('node-cron');
const { findAll, updateOne } = require('../db/databaseHelper');

const dateInPast = function (firstDate, secondDate) {
  if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
};

module.exports = () => {
  // cron scheduler runs every 12am
  cron.schedule('* * * * *', async function () {
    // list of organisation ids
    console.log('i ran');
    const orgList = await findAll('orgs', 'fictionalorganisationtokeeptrack');
    const orgs = orgList.data.data;
    // for each organisation, get all goals
    orgs.forEach(async (org) => {
      const findGoals = await findAll('goals', org.orgId);
      // for each goal, iterate through where date is past, update db.
      let goals = findGoals.data.data;
      goals.forEach(async (goal) => {
        if (dateInPast(new Date(goal.due_date), new Date())) {
          console.log(goal._id);
          await updateOne('goals', { isExpired: true,is_expired:true }, {}, org.orgId, goal._id);
        }
      });
    });
  });
};
