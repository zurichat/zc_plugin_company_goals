const {
  find,
  findById,
  insertOne,
  updateOne
} = require('../db/databaseHelper');
const { targetSchema } = require('../schemas');

const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');

exports.createGoalTargets = catchAsync(async(req, res, next) => {

    // get goal id from the url
    const { org_id, goal_id } = req.query;
    
    logger.info(`Started creating a new target for goal with id ${goal_id}`);
  
    // check if organization id exists
    if (!org_id) {
      console.log("sigh")
      logger.info(`Organization id isn't provided.`);
      // return new AppError("Organization_id is required", 400);
      return res.status(400).send({ error: 'Organization_id is required' });
    }
  
    // check if goal id exists
    if(!goal_id){
        // console.log(goal_id)
        logger.info(`goal_id not specified`);
        return res.status(400).send({ error: 'goal_id is required'})
      }
  
    const target = req.body;
  
    const data = {
        goal_id,
        targets:[
          target,
        ]
      };
      console.log(data)
  
  
    // store the total targets for a goal with the goal_id as the primary key
    // const total_targets = [ target, ];
    // console.log(total_targets)
  
    // // check total_targets length of a goal(using the goal_id)
    // if (total_targets.length >= 4){
    //   logger.info(`Total targets per goal already reached it's max.`);
    //   return res.status(401).json({ error: `Cannot add more than 4 targets` });
    // }
    logger.info(`Started creating targets for goal with id -> ${goal_id}`);
  
    try{
      console.log("Started validating req.body");
      await targetSchema.validateAsync(req.body);
      const newTarget = await insertOne('targets', data, org_id);
      logger.info(`Target created for goal with id ${goal_id}: ${newTarget}`);
      return res.status(200).json({ status: 200, data: data.targets })
    }
    catch(err){
      logger.info(`There are errors with the request body: ${err}`);
      if (err) return res.status(400).json(err.details);
    }
  });

exports.getGoalTargets = catchAsync(async(req, res, next) => {
  const { org_id, goal_id } = req.query;

  logger.info(`Getting goal targets for all goals ${org_id}`);


  if (!org_id) {
    console.log("sigh")
    logger.info(`Organization id isn't provided.`);
    // return new AppError("Organization_id is required", 400);
    return res.status(400).send({ error: 'Organization_id is required' });
  }

  try{
    const allTargets = await find('targets', { goal_id }, org_id);
    //console.log(allTargets)
    return res.status(200).json({ status: allTargets.status, data: allTargets.data })
    }
  catch(err){
    if (err) return res.status(400).json(err.details);
  }
})

exports.updateSingleGoalTargetById = catchAsync(async (req, res, next) => {
   
    // First, Get the TargetById from req.params
    logger.info(`Starting operation to update a Target By Id`);
    const TargetById = req.params.id;
    const { org_id: orgId } = req.query;
  try{
    const Target = await findById('targets', { _id: TargetById }, orgId);

    if (!Target) {
        return res.status(404).send({ error: `This Target does not exist ` });
      }
    ///Validate the body
    await targetSchema.validateAsync({...req.body});

    // Then, send update to zuri core
    logger.info(`Updating Target with id: ${TargetById} with data: ${req.body}`);
    await updateOne('targets', req.body, {}, orgId, TargetById);
  
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: {},
    });
  }catch (error) {
    res.status(500).json({ status: 'failed', message: 'server Error', data: null });
  }
    
  });