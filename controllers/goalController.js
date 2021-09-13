/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const { find, findAll, findById, insertOne, insertMany, deleteOne, updateOne } = require('../db/databaseHelper');
const {goalsSchema } = require('../schemas');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { DATABASE } = require('../utils/config.js');



exports.getAllGoals = catchAsync(async (req, res, next) => {
  const { org_id: orgId } = req.query;

  if (!orgId) {
    return res.status(400).send({error: 'org_id is required'})
  }
  // Search for all Goals
  const goals = await findAll('goals', orgId);

  // Returning Response
  res.status(200).json({ status: 200, message: 'success', data: goals.data.data })
});



exports.createGoal = catchAsync(async (req, res, next) => {

  const roomId = uuidv4();
  const { payload } = DATABASE;
  const { org_id: orgId } = req.query;
  const goal = req.body;
 
    if (!orgId) {
      res.status(400).send({ error: 'Organization_id is required' });
    }

    try {
     await goalsSchema.validateAsync(goal);
    } catch (err) {
    if(err) return res.status(400).json(err.details);
    }
  
      const data = {
        plugin_id: payload.plugin_id,
        organization_id: orgId,
        collection_name: 'goals',
        bulk_write: false,
        payload: {room_id: roomId, ...goal},
      };
  const zzcoreResponse = await insertOne('goals', data, orgId);
 
  if (zzcoreResponse.data.message === 'success') {
    res.status(200).json({ message: 'success', data});
  }
 
});





exports.getSingleGoal = catchAsync(async (req, res, next) => {
  let users;
  const { room_id: id, org_id: org } = req.query;
  const goal = await find('goals', { room_id: id }, org);


  try {
    
    users = await find('roomusers', { room_id: id }, org_id);

    const { data: getUsers } = findUsers.data;
    
    const result = getUsers.map((user) => {
      return user.user_id
    })
    
    const data = {
      goal: goal.data.data,
      users: result
    }
    res.status(200).json({ status: 200, message: 'success', data });
  } catch (err) {
    users = 'No user has been assigned to this goal';
    const data = {
      goal: goal.data.data,
      users,
    };
    res.status(200).json({ status: 200, message: 'success', data});
}
  next(new AppError({ message: 'invalid request' }, {statusCode: 400}));
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
  const goalId = req.query;
  
  // Then, delete the goal.
  await deleteOne(collectionName='goals', data=req.body, filter={}, id=goalId)


  // Then send a response message back to the client.
  return res.status(200).json('Goal deleted successfully.');
});

exports.assignGoal = catchAsync(async (req, res, next) => {
  const { room_id, user_id, organization_id } = req.query;

  // Validate the body
  await userSchema.validateAsync({ room_id, user_id });

  // check that the room_id is valid
  const room = await find('goals', { room_id });

  if (room.data.data.length <= 0) {
    return next(new AppError('Room not found', 404));
  }
  // check that user isnt already in the room
  let roomuser = await find('roomusers', { room_id, user_id }, organization_id);

  if (roomuser.data.data.length > 0) {
    return next(new AppError('user already in room', 400));
  }

  const getAllRooms = await findAll('goals');

  const { data: allRooms } = getAllRooms.data;

  const getRoom = allRooms.filter((el) => el.room_id === room_id);

  const data = {
    room_id: getRoom[0].room_id,
    title: getRoom[0].goal_name,
    access: getRoom[0].access,
    user_id,
  };

  roomuser = await insertOne('roomusers', data, organization_id);
  const seeAll = await findAll('roomusers');

  res.status(201).json({
    status: 'success',
    data: roomuser.data,
  });
});