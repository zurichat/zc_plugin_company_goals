/* eslint-disable no-unused-vars */

// WORK IN PROGRESS
const { find, findAll } = require('../db/databaseHelper');
const AppError = require('../utils/appError');

/**
 * Get all goals
 * @param {string} orgID Organization id
 */
const getGoals = async (orgID, sort, goalType, page = null, limit = null) => {
  if (!orgID) {
    return new AppError(`org_id is required`, 403);
  }

  try {
    // Search for all Goals
    let findGoals;
    if (goalType) {
      findGoals = await find('goals', { goal_type: goalType }, orgID);
    } else {
      findGoals = await findAll('goals', orgID);
    }

    const { data: goals } = findGoals.data;

    if (!goals || goals.length < 1) {
      return { data: [] };
    }

    if (page > 0 && limit > 0) {
      const newPage = page * 1 || 1;
      const perPage = limit * 1 || 7;

      // Calculate the start and end index
      const start = (newPage - 1) * perPage;
      const end = newPage * perPage;
    }
  } catch (error) {
    if (error.isOperational) {
      return error;
    }
    return new AppError(`Something unexpected occured`, 500);
  }
};

module.exports = { getGoals };
