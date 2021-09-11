/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const axios = require('axios');
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
  // Validating each property against their data type
  await goalsSchema.validateAsync(req.body);

  // Creating a new goal
  const goals = await insertOne('goals', req.body)

  // Returning Responses
  res.status(200).json(goals.data);
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
