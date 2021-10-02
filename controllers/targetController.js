const { find, findAll, findById, insertOne, updateOne, deleteMany } = require('../db/databaseHelper');
const { targetSchema } = require('../schemas');
const { reduceCalculation, average, calculate } = require('../utils/calculate');
// Dummy data
const { goalId, targets } = require('../data/target');

const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');

exports.createGoalTargets = catchAsync(async (req, res, next) => {
  // get goal id from the url
  const { org_id, goal_id } = req.query;

  logger.info(`Started creating a new target for goal with id ${goal_id}`);

  // check if organization id exists
  if (!org_id) {
    logger.info(`Organization id isn't provided.`);
    // return new AppError("Organization_id is required", 400);
    return res.status(400).send({ error: 'Organization_id is required' });
  }

  // check if goal id exists
  if (!goal_id) {
    logger.info(`goal_id not specified`);
    return res.status(400).send({ error: 'goal_id is required' });
  }

  const target = req.body;
  let data;

  if (target.type === 'numeric') {
    data = {
      goal_id,
      targets: [target],
    };
  } else {
    data = {
      goal_id,
      target: {
        target,
      },
    };
  }
  console.log(data);

  // store the total targets for a goal with the goal_id as the primary key
  // const total_targets = [ target, ];
  // console.log(total_targets)

  logger.info(`Started creating targets for goal with id api/v1/targeets?org_ -> ${goal_id}`);

  try {
    console.log('Started validating req.body');
    // Validate the request body before creating
    await targetSchema.validateAsync(req.body);

    // Check if we didn't have an existing
    const foundTarget = await find('targets', { goal_id }, org_id);
    const newFoundTarget = foundTarget.data.data;

    if (newFoundTarget !== null) {
      return res.status(400).json({
        status: 400,
        message: 'A target already exist for this goal id',
      });
    }

    // Create a  new target
    const newTarget = await insertOne('targets', data, org_id);
    const allTarget = await findAll('targets', org_id);
    console.log(allTarget.data.data);
    logger.info(`Target created for goal with id ${goal_id}: ${newTarget}`);

    // Response
    return res.status(200).json({ status: 200, data });
  } catch (err) {
    logger.info(`There are errors with the request body: ${err}`);
    if (err) return res.status(400).json(err.details);
  }
});

exports.getGoalTargets = catchAsync(async (req, res, next) => {
  const { org_id, goal_id } = req.query;

  logger.info(`Getting goal targets for all goals ${org_id}`);

  if (!org_id) {
    logger.info(`Organization id isn't provided.`);
    // return new AppError("Organization_id is required", 400);
    return res.status(400).send({ error: 'Organization_id is required' });
  }

  try {
    const allTargets = await findAll('targets', org_id);

    return res.status(200).json({ status: 200, data: allTargets.data });
  } catch (err) {
    if (err) return res.status(400).json(err.details);
  }
});

exports.updateSingleGoalTargetById = catchAsync(async (req, res, next) => {
  // First, Get the TargetById from req.params
  logger.info(`Starting operation to update a Target By Id`);
  const TargetById = req.params.id;
  const { org_id: orgId } = req.query;
  try {
    const Target = await findById('targets', { _id: TargetById }, orgId);

    if (!Target) {
      return res.status(404).send({ error: `This Target does not exist ` });
    }
    ///Validate the body
    await targetSchema.validateAsync({ ...req.body });

    // Then, send update to zuri core
    logger.info(`Updating Target with id: ${TargetById} with data: ${req.body}`);
    await updateOne('targets', req.body, {}, orgId, TargetById);

    return res.status(200).json({
      status: 200,
      message: 'success',
      data: {},
    });
  } catch (error) {
    res.status(500).json({ status: 'failed', message: 'server Error', data: null });
  }
});

exports.deleteTarget = catchAsync(async (req, res, next) => {
  await deleteMany('targets', {}, req.query.org);
  res.status(200).send('hi');
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

const findTarget = async (org_id, res) => {
  let targets;
  try {
    targets = await findAll('targets', org_id);
    // consolelog(targets)
    return targets;
  } catch (err) {
    if (err) return res.status(400).json(err.details);
  }
};

exports.averageGoalProgress = catchAsync(async (req, res, next) => {
  const { org_id } = req.query;
  const dataGoal = await findGoal(org_id, res);
  const dataTarget = await findTarget(org_id, res);
  let goals = dataGoal.data.data;
  let targets = dataTarget.data.data;

  // console.log(goals)
  // console.log(targets)

  // Make the calculation
  const result = calculate(goals, targets);
  const reduceResult = reduceCalculation(result);
  const averageResult = average(reduceResult);
  console.log(averageResult);

  // // Dummy data
  // const result = calculate(goalId, targets);
  // const reduceResult = reduceCalculation(result);
  // const averageResult = average(reduceResult);
  // console.log(averageResult);

  // Response
  return res.status(200).json({
    status: 'success',
    averageResult,
  });
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
    keys.forEach((key) => {
      if (key === goal_id) {
        const finalResult = reduceResult[goal_id];
        await updateOne('goals', {progress: finalResult}, {}, org_id, goal_id
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

// exports.createGoalTargets = catchAsync(async(req, res, next) => {

//   // get goal id from the url
//   const { org_id, goal_id } = req.query;

//   logger.info(`Started creating a new target for goal with id ${goal_id}`);

//   // check if organization id exists
//   if (!org_id) {
//     console.log("sigh")
//     logger.info(`Organization id isn't provided.`);
//     // return new AppError("Organization_id is required", 400);
//     return res.status(400).send({ error: 'Organization_id is required' });
//   }

//   // check if goal id exists
//   if(!goal_id){
//       // console.log(goal_id)
//       logger.info(`goal_id not specified`);
//       return res.status(400).send({ error: 'goal_id is required'})
//     }

//   const target = req.body;

//   const data = {
//       goal_id,
//       targets:[
//         target,
//       ]
//     };
//     console.log(data)

//   // store the total targets for a goal with the goal_id as the primary key
//   // const total_targets = [ target, ];
//   // console.log(total_targets)

//   // // check total_targets length of a goal(using the goal_id)
//   // if (total_targets.length >= 4){
//   //   logger.info(`Total targets per goal already reached it's max.`);
//   //   return res.status(401).json({ error: `Cannot add more than 4 targets` });
//   // }
//   logger.info(`Started creating targets for goal with id -> ${goal_id}`);

//   try{
//     console.log("Started validating req.body");
//     await targetSchema.validateAsync(req.body);
//     const newTarget = await insertOne('targets', data, org_id);
//     logger.info(`Target created for goal with id ${goal_id}: ${newTarget}`);
//     return res.status(200).json({ status: 200, data: data.targets })
//   }
//   catch(err){
//     logger.info(`There are errors with the request body: ${err}`);
//     if (err) return res.status(400).json(err.details);
//   }
// });

// exports.getGoalTargets = catchAsync(async(req, res, next) => {
// const { org_id, goal_id } = req.query;

// logger.info(`Getting goal targets for all goals ${org_id}`);

// if (!org_id) {
//   console.log("sigh")
//   logger.info(`Organization id isn't provided.`);
//   // return new AppError("Organization_id is required", 400);
//   return res.status(400).send({ error: 'Organization_id is required' });
// }

// try{
//   const allTargets = await find('targets', { goal_id }, org_id);
//   //console.log(allTargets)
//   return res.status(200).json({ status: allTargets.status, data: allTargets.data })
//   }
// catch(err){
//   if (err) return res.status(400).json(err.details);
// }
// })

// exports.updateSingleGoalTargetById = catchAsync(async (req, res, next) => {

//   // First, Get the TargetById from req.params
//   logger.info(`Starting operation to update a Target By Id`);
//   const TargetById = req.params.id;
//   const { org_id: orgId } = req.query;
// try{
//   const Target = await findById('targets', { _id: TargetById }, orgId);

//   if (!Target) {
//       return res.status(404).send({ error: `This Target does not exist ` });
//     }
//   ///Validate the body
//   await targetSchema.validateAsync({...req.body});

//   // Then, send update to zuri core
//   logger.info(`Updating Target with id: ${TargetById} with data: ${req.body}`);
//   await updateOne('targets', req.body, {}, orgId, TargetById);

//   return res.status(200).json({
//     status: 200,
//     message: 'success',
//     data: {},
//   });
// }catch (error) {
//   res.status(500).json({ status: 'failed', message: 'server Error', data: null });
// }

// });
