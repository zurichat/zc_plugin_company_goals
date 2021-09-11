/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const { find, findAll, findById, insertOne, deleteOne, updateOne } = require('../db/databaseHelper');
const {goalsSchema } = require('../schemas');
const catchAsync = require('../utils/catchAsync');

exports.getAllGoals = catchAsync(async (req, res, next) => {
  // Search for all Goals
  const goals = await findAll('goals')

  // Returning Response
  res.status(200).json({ status: 200, message: 'success', data: goals.data.data })
});



exports.createGoals = catchAsync(async (req, res, next) => {
  try {

    console.log("step one")
    const goal = req.body;
    console.log(goal, "step two")
    const roomId = uuidv4();
    console.log(roomId, "step three")
    const { goal_name: goalName } = req.body;
    console.log(goalName, "step four")
     await goalsSchema.validateAsync(req.body);
console.log("step five")
    const findGoal = await find('goals', { goal_name: goalName });
console.log(findGoal, "step six")
    const { data: foundGoal } = findGoal.data;

    console.log(foundGoal)

    if (foundGoal.length > 0) {
      return res.status(400).send({message: `Goal with the title: ${goalName} already exists`})
    }
    
    const goals = await insertOne('goals', { roomId, goal });
    
  
    res.status(200).json({ status: 'success', ...goals.data, roomId, goal });

  } catch (err) {
    if (err) {
      return res.status(400).json({error: err.details });
    } 
  }
});





exports.getSingleGoal = catchAsync(async (req, res, next) => {
  // Search for Single Goal by Id
  const goal = await findById('goals', req.params.id)

  // Returning Response
  res.status(200).json({ status: 200, message: 'success', data: goal.data.data });
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
