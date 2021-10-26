/* eslint-disable import/order */
const cron = require('node-cron');
const { findAll, updateOne } = require('../db/databaseHelper');
const { createNotification } = require('./notificationController');
const sync = require('./syncController');
const { publish } = require('./centrifugoController');
const logger = require('../utils/logger');

const dateInPast = (firstDate, secondDate) => {
  if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
};

module.exports = () => {
  // cron scheduler runs every 12am
  cron.schedule('0 0 0 * * *', async () => {
    // list of organisation ids
    const orgList = await findAll('orgs', 'fictionalorganisationtokeeptrack');
    const orgs = orgList.data.data;
    // for each organisation, get all goals
    orgs.forEach(async (org) => {
      try {
        const findGoals = await findAll('goals', org.orgId);
        // for each goal, iterate through where date is past, update db.
        let goals = findGoals.data.data;
        if (!goals) {
          goals = [];
        }
        goals.forEach(async (goal) => {
          if (dateInPast(new Date(goal.due_date), new Date()) && !goal.is_completed) {
            // eslint-disable-next-line no-underscore-dangle
            await updateOne('goals', { isExpired: true, is_expired: true }, {}, org.orgId, goal._id);
            await createNotification(org.orgId, goal.room_id, goal.goal_name, 'expiredGoal');
          }
        });
      } catch (error) {
        if (error.response) {
          logger.error(error.response.message);
        } else {
          logger.error(error.message);
        }
        logger.error('Error occured in expire cron controller');
      }
    });
  });

  // sync schedule
  cron.schedule('0 0 0 * * *', () => {
    sync();
  });

  // cron.schedule('*/10 * * * * *', async () => {
  //   await publish('centrifugo-is-working', { data: 'Centrifugo is now working' });
  // });
};
