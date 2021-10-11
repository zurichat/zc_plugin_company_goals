/* eslint-disable no-useless-escape */
/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { find, findAll } = require('../db/databaseHelper');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger.js');

exports.searchGoals = catchAsync(async (req, res, next) => {
  const { org_id: orgId, search, type: goalType } = req.query;

  if (!orgId) {
    logger.info(`Can't get goals for null organisation id... Exiting...`);
    return res.status(400).send({ error: 'org_id is required' });
  }

  // Search for all Goals
  try {
    logger.info(`Started getting all goals for the organization: ${orgId}`);
    let findGoals;
    if (goalType) {
      findGoals = await find('goals', { goal_type: goalType }, orgId);
    } else {
      findGoals = await findAll('goals', orgId);
    }
    const { data: goals } = findGoals.data;

    // No matching data, return an empty array
    if (goals === null || goals.length < 1) return res.status(200).json({ message: 'success', data: [] });

    let sorted;
    // 200, response
    if (findGoals.data.status === 200 && goals.length > 0) {
      sorted = goals
        .sort((a, b) => {
          const c = new Date(a.created_at);
          const d = new Date(b.created_at);
          return c - d;
        })
        .reverse();

      let newGoals = sorted;

      if (search) {
        newGoals = newGoals.filter(({ goal_name }) => {
          return goal_name.toLowerCase().includes(search.toLowerCase());
        });
        // Sending response
        return res.status(200).json({
          status: 200,
          message: 'success',
          data: newGoals,
        });
      }

      // Sending response
      return res.status(200).json({
        status: 400,
        message: 'fali',
        data: [],
      });
    }
  } catch (error) {
    logger.info('no goals for this organization');
    console.log(error);
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: [],
    });
  }
});
