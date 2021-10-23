const { find, findAll, findById, insertOne, updateOne, deleteMany } = require('../db/databaseHelper');
const { findTargets, addTarget, updateTargetById, deleteGoalTargets } = require('../services/target.service');
const { reduceCalculation, average, calculate, getNumericalTgtDone, getLogicalTgtDone } = require('../utils/calculate');
// Dummy data
const { goalId, targets } = require('../data/target');

const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

exports.createGoalTarget = catchAsync(async (req, res, next) => {
  // get goal id from the url
  const { org_id, goal_id } = req.query;
  const target = req.body;
  try {
    const data = await addTarget(goal_id, org_id, target);
    if (data instanceof Error) {
      return res.status(data.statusCode).json({ status: data.statusCode, message: data.message });
    }
    return res.status(200).json({ status: 200, message: 'success', payload: data });
  } catch (err) {
    return next(err);
  }
});

exports.getGoalTargets = catchAsync(async (req, res, next) => {
  const { org_id, goal_id } = req.query;

  try {
    // call the findTargets service
    const data = await findTargets(org_id);

    // check if an error was returned
    if (data instanceof Error) {
      return res.status(data.statusCode).json({ status: data.statusCode, message: data.message });
    }
    return res.status(200).json({ status: 200, message: 'success', payload: data });
  } catch (err) {
    return next(error);
  }
});

exports.updateTarget = catchAsync(async (req, res, next) => {
  const { org_id: orgId, goal_id: goalId, target_id: targetId } = req.query;

  const reqTarget = req.body;
  try {
    const updatedTarget = await updateTargetById(targetId, reqTarget, orgId, goalId);

    if (updatedTarget instanceof Error) {
      return res.status(data.statusCode).json({ status: data.statusCode, message: data.message });
    }
    return res.status(200).json({ status: 200, message: 'success', payload: data });
  } catch (err) {
    return next(error);
  }
});

exports.deleteTargets = catchAsync(async (req, res, next) => {
  const { org_id: orgId, goal_id: goalId } = req.query;
  try {
    deleteGoalTargets(orgId, goalId);
    return res.status(200).json({ message: `Delete all operation for goal ${goalId} successful.` });
  } catch (err) {
    return next(error);
  }
});

const findGoal = async (org_id, res) => {
  let goals;
  try {
    goals = await findAll('goals', org_id);
    // console.log(goals)
    return goals;
  } catch (err) {
    if (err) return res.status(400).json(err.details);
  }
};

exports.averageGoalProgress = catchAsync(async (req, res, next) => {
  const { org_id } = req.query;
  let progress = 0;
  // const dataGoal = await findGoal(org_id, res);
  // const dataTarget = await findTarget(org_id, res);
  // let goals = dataGoal.data.data;
  // let targets = dataTarget.data.data;
  const data = await findAll('goals', org_id);
  const goals = data.data.data;

  // console.log(goals)
  // console.log(targets)
  goals.forEach((goal) => {
    progress += goal.progress;
  });

  // // Make the calculation
  // const result = calculate(goals, targets);
  // const reduceResult = reduceCalculation(result);
  // const averageResult = average(reduceResult);
  // console.log(averageResult);

  // // Dummy data
  // const result = calculate(goalId, targets);
  // const reduceResult = reduceCalculation(result);
  // const averageResult = average(reduceResult);
  // console.log(averageResult);

  // Response
  return res.status(200).json({
    status: 'success',
    averageResult: progress / goals.length,
  });
});

exports.getGoalProgress = catchAsync(async (req, res, next) => {
  const { org_id, goal_id } = req.query;

  if (!org_id) {
    logger.info(`Organization id isn't provided.`);

    return res.status(400).send({ error: 'Organization_id is required' });
  }

  if (!goal_id) {
    logger.info(`Goal id isn't provided.`);

    return res.status(400).send({ error: 'Goal_id is required' });
  }

  try {
    //get all targets with similar goal ID
    const foundTargets = await find('targets', { goal_id }, org_id);
    //logical targets are like open ended questions, yes or no answers
    const logicalTargets = [];
    //numerical targets are those with number values
    const numericalTargets = [];

    //check if a target is of type logical or numerical, if it is then populate the arrays defined above
    for (let i = 0; i < foundTargets.data.data.length; i++) {
      if (typeof foundTargets.data.data[i].target === 'number') {
        numericalTargets.push(foundTargets.data.data[i]);
      }
      if (typeof foundTargets.data.data[i].target === 'string') {
        logicalTargets.push(foundTargets.data.data[i]);
      }
    }

    const numericalBag = getNumericalTgtDone(numericalTargets);
    const logicalBag = getLogicalTgtDone(logicalTargets);

    // //const achievedTargets = getLogicalTgtDone(logicalTargets) + getNumericalTgtDone(numericalTargets)
    const achievedTargetsPercentage =
      ((logicalBag.logicalTargetDone.length + numericalBag.numericalTargetsDone.length) /
        foundTargets.data.data.length) *
      100;

    const unachievedTargetsPercentage =
      ((logicalBag.logicalTargetNotDone.length + numericalBag.numericalTargetsNotDone.length) /
        foundTargets.data.data.length) *
      100;
    await updateOne('goals', { progress: achievedTargetsPercentage }, {}, org_id, goal_id);

    //send response with total number of targets in percentage
    return res.status(200).json({
      status: 200,
      data: {
        achievedTargetsPercentage,
        unachievedTargetsPercentage,
      },
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

exports.getSingleGoalProgress = catchAsync(async (req, res, next) => {
  const { org_id, goal_id } = req.query;

  if (!org_id) {
    logger.info(`Organization id isn't provided.`);
    // return new AppError("Organization_id is required", 400);
    return res.status(400).send({ error: 'Organization_id is required' });
  }

  if (!goal_id) {
    logger.info(`Goal id isn't provided.`);
    // return new AppError("Organization_id is required", 400);
    return res.status(400).send({ error: 'Goal_id is required' });
  }

  try {
    const dataGoal = await findGoal(org_id, res);
    const dataTarget = await findTarget(org_id, res);
    const goals = dataGoal.data.data;
    const targets = dataTarget.data.data;

    const result = calculate(goals, targets);
    const reduceResult = reduceCalculation(result);
    const keys = Object.keys(reduceResult);
    keys.forEach(async (key) => {
      if (key === goal_id) {
        const finalResult = reduceResult[goal_id];
        await updateOne('goals', { progress: finalResult }, {}, org_id, goal_id);
        return res.status(200).json({
          status: 200,
          finalResult,
        });
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

// exports.updateSingleGoalTargetById = catchAsync(async (req, res, next) => {
//   // First, Get the TargetById from req.params
//   logger.info(`Starting operation to update a Target By Id`);
//   const targetId = req.params.id;
//   const { org_id: orgId } = req.query;
//   const payload = req.body
//   try{
//     const data = await updateTargetById(targetId, payload, orgId);

//     if (data instanceof Error) {
//       return res.status(data.statusCode).json({ status: data.statusCode, message: data.message });
//     }
//     return res.status(200).json({ status: 200, message: 'success', payload: data });
//   }
//   catch(err){
//     return next(error);
//   }
// });
