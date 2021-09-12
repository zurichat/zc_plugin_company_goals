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



<<<<<<< HEAD
  const goals = await axios.post(`https://test-zuri-core.herokuapp.com/crud/goals/insert-one`, req.body);
  /* const goals = await axios.post(`https://zccore.herokuapp.com/data/write`, {
    plugin_id: 'xxx',
    organization_id: 'xxx',
    collection_name: 'goals',
    bulk_write: false,
    payload: req.body,
  }); */
  //console.log(goals);
  // Sending Responses
  res.status(200).json({ status: 'success', data: { id: goals.data.insertedId, ...data } });
=======
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
>>>>>>> 125b02986033554193e1abc512c209a90bb2a0f4
});





exports.getSingleGoal = catchAsync(async (req, res, next) => {
  const { room_id: id } = req.query;
  // Search for Single Goal by Id
  const goal = await find('goals', { room_id: id });

<<<<<<< HEAD
exports.createGoal = catchAsync(async(req, res, next)=>{

  await res.status(201).send({message: "Success, Goal Created", data:{
    "title": "Goal",
    "description": "This is a quarterly goal",
    "weeklyGoal": "false",
    "monthlyGoal": "false",
    "quarterlyGoal":"true",
    "biannualGoal": "false",
    "annualGoal": "false",
    "achieved": "false",
    "createdBy": "HR",
    "createdAt": "Wed Sep 3 2020 01:00:00 GMT+0100(WAT)",
    "updatedAt": "Wed Sep 3 2020 01:00:00 GMT+0100(WAT)"
  }})

  
})

exports.updateGoalByID = catchAsync(async (req, res, next) => {
  // Get updated info from req.body
  // const { update, $set, name } = { ...req.body } ;
  // const data = { update: {
  //   $set: {
  //     name
  //   }
  // }}
  const goalId = req.params.id;
  const collectionName = 'goals';

  // send the updated goal info to zuri core
  const url = `https://test-zuri-core.herokuapp.com/crud/${collectionName}/update-by-id/${goalId}`;
  const updatedGoal = await axios.patch(url, { ...req.body });
=======

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

>>>>>>> 125b02986033554193e1abc512c209a90bb2a0f4

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
