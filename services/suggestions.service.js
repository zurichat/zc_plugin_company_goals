/* eslint-disable camelcase */
const { findAll } = require('../db/databaseHelper');
const AppError = require('../utils/appError');

exports.getSuggestions = async (orgID, memberID) => {
  if (!orgID || !memberID) {
    return new AppError('No organization ID or member ID was provided', 500);
  }

  try {
    const {
      data: { data },
    } = await findAll('goals', orgID);

    const payload = data.reduce((prev, obj) => {
      const { goal_name, description, category, goal_type } = obj;

      return [goal_name, description, category, goal_type, ...prev];
    }, []);

    return payload;
  } catch (error) {
    return error;
  }
};