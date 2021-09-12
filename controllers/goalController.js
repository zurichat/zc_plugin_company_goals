/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const { find, findAll, findById, insertOne, insertMany, deleteOne, updateOne } = require('../db/databaseHelper');
const {goalsSchema } = require('../schemas');
const catchAsync = require('../utils/catchAsync');

exports.getAllGoals = catchAsync(async (req, res, next) => {
  // Search for all Goals
  const goals = await findAll('goals')

  // Returning Response
  res.status(200).json({ status: 200, message: 'success', data: goals.data.data })
});



exports.createGoal = catchAsync(async (req, res, next) => {
  try {
  
    const { organization_id: orgId } = req.query;
    const goal = req.body;
 
    const roomId = uuidv4();

    if (!orgId) {
      res.status(400).send({ error: 'Organization_id is required' });
    }
    
    const { goal_name: goalName } = req.body;

    await goalsSchema.validateAsync(req.body);

    const findGoal = await find('goals', {goal_name: goalName});

    const { data: foundGoal } = findGoal.data;

    if (foundGoal.length > 0) {
      return res.status(400).send({error: `Goal with the title: ${goalName} already exists`})
    }

    const data = {
      room_id: roomId,
      organization_id: orgId,
      ...goal
    }
    
    const goals = await insertOne('goals', data);
    
    res.status(200).json({ message: 'success', ...goals.data, data });

  } catch (err) {
    if (err) {
      return res.status(400).json({error: err.details });
    } 
  }
});





exports.getSingleGoal = catchAsync(async (req, res, next) => {
  const { room_id: id } = req.query;
  // Search for Single Goal by Id
  const goal = await find('goals', { room_id: id });


  const findUsers = await find('roomusers', { room_id: id });

  const { data: getUsers } = findUsers.data;

  const result = getUsers.map((user) => {
    return user.user_id
  })

  const data = {
    goal: goal.data.data,
    users: result
}

  // Returning Response
  res.status(200).json({ status: 200, message: 'success', data});
});

exports.updateSingleGoalById = catchAsync(async (req, res, next) => {
  // First, Get the goalId from req.params
  const goalId = req.params.id;
  
  // Then, send update to zuri core
  const updatedGoal = await updateOne(collectionName='goals', data=req.body, filter={}, id=goalId)


  // send the updated goal to client.
  return res.status(200).json(updatedGoal.data);
});

exports.getArchivedGoals = catchAsync(async (req, res, next) => {

  // Gets archived goals
  const goals = await find('goals', {achieved: false});

  // Condition if there are no archivedd goals
  if (goals.data.data.length < 1) {
    goals.data.data = 'No archived goals yet.'
  }

  // Return Response
  res.status(200).json({ status: 200, message: 'success', data: goals.data.data });
});

exports.deleteGoal = catchAsync(async (req, res, next) => {
  // First, Get the goalId from req.params
  const goalId = req.params.id;
  
  // Then, delete the goal.
  await deleteOne(collectionName='goals', data=req.body, filter={}, id=goalId)


  // Then send a response message back to the client.
  return res.status(200).json('Goal deleted successfully.');
});
