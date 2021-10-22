const { findAll, insertOne, updateOne, findById, deleteMany } = require('../db/databaseHelper');
const logger = require('../utils/logger');
const { targetSchema } = require('../schemas/index');
const AppError = require('../utils/appError');

/**
 * Service for finding goal targets
 * @param {string} orgId User's organization id
 * returns null || []
 */

exports.findTargets = async (orgId) => {
  logger.info(`Getting goal targets for all goals ${orgId}`);

  if (!org_id) {
    logger.info(`Organization id isn't provided.`);
    return new AppError('Organization_id is required', 400);
  }

  try {
    const allTargets = await findAll('targets', orgId);

    if (!allTargets) {
      allTargets.data = [];
    }
    return allTargets.data;
  } catch (err) {
    if (err) return new AppError(err.details, 500);
  }
};

/**
 * Service for adding targets to a goal.
 * @param {string} orgId User's organization id
 * @param {string} goalId goal id
 * @param {object} target User's organization id
 * returns null || {}
 */

exports.addTarget = async (goal_id, org_id, target) => {
  logger.info(`Started creating a new target for goal with id ${goal_id}`);

  // check if organization id exists
  if (!org_id) {
    logger.info(`Organization id isn't provided.`);
    return new AppError('Organization_id is required', 400);
  }

  // check if goal id exists
  if (!goal_id) {
    logger.info(`goal_id not specified`);
    return new AppError('Goal Id is required', 400);
  }

  logger.info(`Started creating targets for goal with id api/v1/targets?org_ -> ${goal_id}`);

  try {
    console.log('Started validating req.body');

    const validatedTarget = await targetSchema.validateAsync(target);
    validatedTarget.goal_id = goal_id;

    // Create a  new target
    const newTarget = await insertOne('targets', validatedTarget, org_id);

    logger.info(`Target created for goal with id ${goal_id}: ${newTarget}`);

    return res.status(200).json({ status: 200, data: newTarget.data });
  } catch (err) {
    logger.info(`There are errors with the request body: ${err}`);
    if (err) return res.status(400).json(err.details);
  }
};

/**
 * Service for updating goal targets.
 * @param {string} targetId  target id
 * @param {object} payload updated target info
 * @param {string} orgId user's organization id
 * returns null || {}
 */
exports.updateTargetById = async (targetId, payload, orgId, goalId) => {
  // check if organization id exists
  if (!orgId) {
    logger.info(`Organization id isn't provided.`);
    return new AppError('Organization_id is required', 400);
  }

  // check if goal id exists
  if (!goalId) {
    logger.info(`goal_id not specified`);
    return new AppError('Goal Id is required', 400);
  }

  // check if target id exists
  if (!targetId) {
    logger.info(`target_id not specified`);
    return new AppError('Target Id is required', 400);
  }

  try {
    // check that the goal_id is valid
    const goal = await find('goals', { _id: goalId }, orgId);

    if (goal.data.data === null) {
      return res.status(400).send({ error: `The goal with the goal id of ${goalId} does not exist` });
    }
    // check that the target_id is valid
    const target = await find('targets', { _id: targetId }, orgId);

    if (target.data.data === null) {
      return res.status(400).send({ error: `The target with the target id of ${targetId} does not exist` });
    }
    // update target
    logger.info(`Updating target`);
    const updatedTarget = await updateOne('targets', payload, { _id: targetId }, orgId);
    logger.info(`Target update with id ${targetId}`);

    logger.info(`Target update`);
    return res.status(200).json({ status: 200, data: updatedTarget.data.data });
  } catch (err) {
    logger.info(`There are errors ${err}`);
    if (err) return res.status(500).json(err);
  }

  try {
    const target = await findById('targets', { _id: targetId }, orgId);

    if (!target) {
      return res.status(404).send({ error: `This Target does not exist ` });
    }

    await targetSchema.validateAsync({ ...payload });

    logger.info(`Updating Target with id: ${targetId} with data: ${payload}`);
    await updateOne('targets', payload, {}, orgId, targetId);

    return res.status(200).json({
      status: 200,
      message: 'success',
      data: `Target with id ${targetId} successfully updated`,
    });
  } catch (error) {
    return new AppError('Something went wrong, try again', 500);
  }
};

/**
 * Service for deleting all targets for all goal.
 * @param {string} orgId User's organization id
 * @param {string} goalId target's goal id
 * returns {}
 */
exports.deleteGoalTargets = async (orgId, goalId) => {
  try {
    logger.info(`Deleting targets for goal with id ${goalId}`);

    await deleteMany('targets', { goalId: goalId }, orgId);
  } catch (error) {
    return new AppError('Something went wrong, try again', 500);
  }
};
