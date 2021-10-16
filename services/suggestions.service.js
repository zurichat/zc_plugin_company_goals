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

    return data.reduce((prev, obj) => {
      const { goal_name, description, category, goal_type } = obj;
      return {
        [obj.goal_name]: goal_name,
        [obj.description]: description,
        [obj.category]: category,
        [obj.goal_type]: goal_type,
        ...prev,
      };
    }, {});
  } catch (error) {
    return error;
  }
};
