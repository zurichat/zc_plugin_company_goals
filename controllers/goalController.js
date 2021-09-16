/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const { find, findAll, findById, insertOne, insertMany, deleteOne, updateOne } = require('../db/databaseHelper');
const { goalsSchema, likeGoalSchema, getGoalLikesSchema } = require('../schemas');
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


  // const goals = await axios.post(`https://test-zuri-core.herokuapp.com/crud/goals/insert-one`, req.body);
  // /* const goals = await axios.post(`https://zccore.herokuapp.com/data/write`, {
  //   plugin_id: 'xxx',
  //   organization_id: 'xxx',
  //   collection_name: 'goals',
  //   bulk_write: false,
  //   payload: req.body,
  // }); */
  // //console.log(goals);
  // // Sending Responses
  // res.status(200).json({ status: 'success', data: { id: goals.data.insertedId, ...data } });

exports.createGoal = catchAsync(async (req, res, next) => {
  const roomId = uuidv4();
  const { org_id: orgId } = req.query;
  const { goal_name: title, category } = req.body;
  const goal = req.body;
  let goals;

  const data = {
    room_id: roomId,
    organization_id: orgId,
    ...goal,
  };

  if (!orgId) {
    res.status(400).send({ error: 'Organization_id is required' });
  }

  try {
    await goalsSchema.validateAsync(req.body.payload);
  } catch (err) {
    if (err) return res.status(400).json(err.details);
  }

  try {
    goals = await find('goals', { goal_name: title }, orgId);
    const { data: foundGoal } = goals.data;

    if (foundGoal[0].goal_name === title && foundGoal[0].category === category) {
      return res
        .status(400)
        .send({
          error: `Goal with the title: '${title}' and  category: '${category}' already exists on your organization`,
        });
    }
  } catch (error) {
    goals = await insertOne('goals', data, orgId);
  }

  res.status(200).json({ message: 'success', ...goals.data, data });
});





exports.getSingleGoal = catchAsync(async (req, res, next) => {
  // NOTICE: YOU ARE GETTING THE GOAL BY ITS UUID STRING
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

  // Condition if there are no archived goals
  if (goals.data.data.length < 1) {
    goals.data.data = 'No archived goals yet.'
  }

  // Return Response
  res.status(200).json({ status: 200, message: 'success', data: goals.data.data });
});

exports.deleteGoalById = catchAsync(async (req, res, next) => {
  // First, Get the goalId & orgid from req.params
  const { goal_id: id, org_id: org } = req.query;

  // The organization id is required.
  if (!org) {
    res.status(400).send({ error: 'Organization_id is required' });
  }

  // find the goal first to ensure the goal was created by the organization
  const goal = await find('goals', { _id: id }, org);

  if (!goal.data.data) {
    res.status(404).send({ error: 'There is no goal of this id attached to this organization id that was found.' });
  }

  // Then, delete the goal.
  const response = await deleteOne(collectionName='goals', data=org, _id=id);

  res.status(200).json({status: 200, message: 'Goal deleted successfully.', rsponse: response.data.data});

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

exports.likeGoal = catchAsync(async (req, res, next) => {
  const { goal_id: goalId, user_id: userId, org_id: orgId } = req.query;

  // Validate the body
  await likeGoalSchema.validateAsync({ goalId, userId, orgId });

  // check that the goal_id is valid
  const goal = await find('goals', { _id: goalId }, orgId);

  if (!goal.data.data) {
    return next(new AppError('There is no goal of this id attached to this organization id that was found.', 404));
  }

  // check if user already liked goal
  const like = await find('goallikes', { goal_id: goalId, user_id: userId }, orgId);

  // add like if it doesnt exist
  if (!like.data.data) {
    addedLike = await insertOne('goallikes', { goal_id: goalId, user_id: userId }, orgId);

    return res.status(201).json({
      status: 'success',
      message: 'Goal like added',
      data: {},
    });
  }

  removeLike = await deleteOne('goallikes', orgId, like.data.data[0]._id);
  // delete like from db
  res.status(201).json({
    status: 'success',
    message: 'Goal like removed',
    data: {},
  });
});

exports.getGoalLikes = catchAsync(async (req, res, next) => {
  const { goal_id: goalId, org_id: orgId } = req.query;

  // Validate the body
  await getGoalLikesSchema.validateAsync({ goalId, orgId });

  // check that the goal_id is valid
  const goal = await find('goals', { _id: goalId }, orgId);

  if (!goal.data.data) {
    return next(new AppError('There is no goal of this id attached to this organization id that was found.', 404));
  }

  // check if user already liked goal
  const like = await find('goallikes', { goal_id: goalId }, orgId);
  if (!like.data.data) {
    return res.status(200).json({
      status: 'success',
      data: { count: 0, likes: [] },
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      count: like.data.data.length,
      likes: like.data.data,
    },
  });
});

exports.checkUserLike = catchAsync(async (req, res, next) => {
  const { goal_id: goalId, user_id: userId, org_id: orgId } = req.query;

  // Validate the body
  await likeGoalSchema.validateAsync({ goalId, userId, orgId });

  // check that the goal_id is valid
  const goal = await find('goals', { _id: goalId }, orgId);

  if (!goal.data.data) {
    return next(new AppError('There is no goal of this id attached to this organization id that was found.', 404));
  }

  // check if user already liked goal
  const like = await find('goallikes', { goal_id: goalId, user_id: userId }, orgId);
  if (!like.data.data) {
    return res.status(200).json({
      status: 'success',
      data: false,
    });
  }
  res.status(200).json({
    status: 'success',
    data: true,
  });
});