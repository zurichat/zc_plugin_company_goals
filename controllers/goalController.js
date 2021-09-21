/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const {
  find,
  findAll,
  findById,
  insertOne,
  insertMany,
  deleteOne,
  updateOne,
  deleteMany,
} = require('../db/databaseHelper');
const { goalSchema, likeGoalSchema, getGoalLikesSchema } = require('../schemas');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');
const { publish } = require('./centrifugoController');
const { createNotification } = require('./notificationController');

exports.getAllGoals = catchAsync(async (req, res, next) => {
  const { org_id: orgId } = req.query;

  if (!orgId) {
    logger.info(`Can't get goals for null organisation id... Exiting...`);
    return res.status(400).send({ error: 'org_id is required' });
  }
  logger.info(`Started getting all goals for the organization: ${orgId}`);
  // Search for all Goals
  const goals = await findAll('goals', orgId);

  if (goals.data.status === 200) {
    res.status(200).json({ status: 200, message: 'success', data: goals.data.data });
  }
});

exports.createGoal = async (req, res, next) => {
  logger.info(`Started creating a new goal.`);

  const roomId = uuidv4();
  const { org_id: orgId } = req.query;
  const { goal_name: title, category } = req.body;

  const goal = req.body;
  let goals;

  const data = {
    room_id: roomId,
    isComplete: false,
    isExpired: false,
    ...goal,
  };

  if (!orgId) {
    logger.info(`Unable to create a goal as organization id isn't provided.`);
    res.status(400).send({ error: 'Organization_id is required' });
    return;
  }

  try {
    await goalSchema.validateAsync(req.body);
    logger.info(`Successfully validated the request body.`);
  } catch (err) {
    logger.info(`There are errors with the request body: ${err.details}`);
    if (err) return res.status(400).json(err.details);
  }

  try {
    logger.info(
      `Checking to ensure there are no goals with the title: ${title} that belong to the ${category} category.`
    );
    goals = await find('goals', { goal_name: title }, orgId);

    const { data: foundGoal } = goals.data;

    if (foundGoal[0].goal_name === title && foundGoal[0].category === category) {
      logger.info(`You are not allowed to create a goal with the same name as a previous goal.`);
      return res.status(400).send({
        error: `Goal with the title: '${title}' and  category: '${category}' already exists on your organization`,
      });
    }
  } catch (error) {
    logger.info(`There are no goals with the title: ${title}`);
    goals = await insertOne('goals', data, orgId);
    logger.info(`Successfully created a new goal: ${goals.data.data}`);
  }

  const message = {
    header: 'You have been assigned a new goal',
    goalName: title,
    description: 'Your team and you have within the stipulated time to achieve this goal.',
    createdAt: Date.now(),
    color: 'blue',
    isRead: false,
    id: '',
  };

  const messageId = await insertOne('goalEvents', message, orgId);
  message.id = messageId.data.object_id;
  await publish('notifications', { ...message, _id: message.id });
  res.status(200).json({ message: 'success', ...goals.data, data });
};

exports.getSingleGoal = catchAsync(async (req, res, next) => {
  logger.info(`Started getting a single goal by its UUID.`);
  // NOTICE: YOU ARE GETTING THE GOAL BY ITS UUID STRING
  let users;
  const { room_id: id, org_id: org } = req.query;

  if (!id || !org) {
    return res.status(400).send({ error: `Parameters missing room id or organization id` });
  }

  const goal = await find('goals', { room_id: id }, org);
  logger.info(`Found goal: ${goal.data.data} successfully.`);

  if (goal.data.data === null) {
    return res.status(400).send({ error: `The goal with the room id of ${id} does not exist` });
  }

  try {
    const findUsers = await find('roomusers', { room_id: id }, org);
    logger.info(`Getting all the users that are in the goal.`);

    const { data: getUsers } = findUsers.data;

    const mapResults = getUsers.map((user) => {
      const result = user.user_id;
      return result;
    });

    const data = {
      goal: goal.data.data,
      assigned_users: mapResults,
    };

    logger.info(`Found users: ${users}`);
    res.status(200).json({ status: 200, message: 'success', data });
  } catch (err) {
    logger.info(`Did not find any user attached to the goal.`);

    users = 'No user has been assigned to this goal';
    const data = {
      goal: goal.data.data,
      users,
    };

    logger.info(`Successfully found users attached to the goal.`);
    res.status(200).json({ status: 200, message: 'success', data });
  }
  next(new AppError({ message: 'invalid request' }, { statusCode: 400 }));
});

exports.updateSingleGoalById = catchAsync(async (req, res, next) => {
  // First, Get the goalId from req.params
  logger.info(`Starting operation to update a goal by its id.`);
  const goalId = req.params.id;
  const { org_id: orgId } = req.query;

  const goals = await findById('goals', goalId, orgId);

  const message = {
    header: 'Your goal has been updated',
    goalName: goals.data.data.title,
    description: `The goal "${goals.data.data.title}" has been updated `,
    createdAt: Date.now(),
    color: 'green',
    isRead: false,
    id: '',
  };

  const messageId = await insertOne('goalEvents', message, orgId);
  message.id = messageId.data.object_id;
  await publish('notifications', { ...message, _id: message.id });

  // Then, send update to zuri core
  logger.info(`Updating goal with id: ${goalId} with data: ${req.body}`);
  const updatedGoal = await updateOne(
    (collectionName = 'goals'),
    (organization_id = orgId),
    (data = req.body),
    (filter = {}),
    (id = goalId)
  );

  // const roomuser = await find('roomusers', { room_id: goalId }, org);

  // const roomUsers = roomuser.data.data;

  // if (req.body.isExpired === true) {
  //   const myFunc = async(user) =>{
  //     await createNotification(user.user_id, orgId, goalId, updatedGoal.data.data[0].goal_name, 'expiredGoal')
  //   }
  //   if (roomUsers !== null) {
  //     roomUsers.forEach(myFunc);
  //   }
  // } else if (req.body.isComplete === true) {
  //   const myFunc = async(user) =>{
  //     await createNotification(user.user_id, orgId, goalId, updatedGoal.data.data[0].goal_name, 'achievedGoal')
  //   }
  //   if (roomUsers !== null) {
  //     roomUsers.forEach(myFunc);
  //   }
  // }

  // send the updated goal to client.
  logger.info(`Successfully updated the goal and got the response: ${updatedGoal.data.data}`);
  return res.status(200).json(updatedGoal.data);
});

exports.getArchivedGoals = catchAsync(async (req, res, next) => {
  // Gets archived goals
  const goals = await find('goals', { achieved: false });

  // Condition if there are no archived goals
  if (goals.data.data.length < 1) {
    goals.data.data = 'No archived goals yet.';
  }

  // Return Response
  res.status(200).json({
    status: 200,
    message: 'success',
    data: goals.data.data,
  });
});

exports.deleteGoalById = catchAsync(async (req, res, next) => {
  // First, Get the goalId & orgid from req.params
  const { goal_id: id, org_id: org } = req.query;

  logger.info(`Would attempt to delete goal for ${org} with id: ${id}`);

  // The organization id is required.
  if (!org) {
    logger.info('please provide an organization id.');
    res.status(400).send({ error: 'Organization_id is required' });
  }

  // find the goal first to ensure the goal was created by the organization
  logger.info(`Checking to make sure the organization that deleted is the one deleting.`);
  const goal = await find('goals', { _id: id }, org);

  if (!goal.data.data) {
    logger.info('Wrong organization id provided.');
    res.status(404).send({ error: 'There is no goal of this id attached to this organization id that was found.' });
  }

  const { room_id: roomId } = goal.data.data;

  // delete assigned records
  await deleteMany('roomusers', { room_id: roomId }, org);

  // Then, delete the goal.
  const response = await deleteOne((collectionName = 'goals'), (data = org), (_id = id));

  const message = {
    header: 'You have been unassigned from this goal',
    goalName: goal.data.data.title,
    description: `The goal "${goal.data.data.title}" has been deleted `,
    createdAt: Date.now(),
    color: 'red',
    isRead: false,
    id: '',
  };

  const messageId = await insertOne('goalEvents', message, org);
  message.id = messageId.data.object_id;
  await publish('notifications', { ...message, _id: message.id });

  logger.info(`Successfully deleted the goal with id: ${id}`);
  res.status(200).json({ status: 200, message: 'Goal deleted successfully.', rsponse: response.data.data });
});

exports.assignGoal = catchAsync(async (req, res, next) => {
  const { room_id, user_id, org_id: org } = req.query;

  // check that the room_id is valid
  const room = await find('goals', { room_id }, org);

  if (room.data.data.length <= 0) {
    return next(new AppError('Room not found', 404));
  }
  // check that user isnt already in the room
  try {
    const roomuser = await find(
      'roomusers',
      {
        room_id,
        user_id,
      },
      org
    );

    if (roomuser !== null && roomuser.data.data.length > 0) {
      return res.status(400).send({
        message: 'User already assigned to goal',
      });
    }
  } catch (error) {
    if (error) {
      const getAllRooms = await findAll('goals', org);
      const { data: allRooms } = getAllRooms.data;

      const getRoom = allRooms.filter((el) => el.room_id === room_id);

      const data = {
        goal_id: getRoom[0]._id,
        room_id: getRoom[0].room_id,
        title: getRoom[0].goal_name,
        access: getRoom[0].access,
        user_id,
      };

      const roomuser = await insertOne('roomusers', data, org);

      // Send a notification to the user.
      await createNotification(user_id, org, room_id, data.title, 'assignGoal');
      // Please don't delete the above line of code. It doesn't affect this controller.
      // Add specificity later
      const message = {
        header: 'Goal assigned',
        goalName: data.title,
        description: 'The goal has been assigned',
        createdAt: Date.now(),
        color: 'blue',
        isRead: false,
        id: '',
      };
      const messageId = await insertOne('goalEvents', message, org);
      message.id = messageId.data.object_id;
      await publish('notifications', { ...message, _id: message.id });

      res.status(201).json({
        status: 'success',
        data: roomuser.data,
      });
    }
  }
});

exports.removeAssigned = catchAsync(async (req, res, next) => {
  const { room_id, user_id, org_id: org } = req.query;

  // check that the room_id is valid
  const room = await find('goals', { room_id }, org);

  if (room.data.data === null) {
    return res.status(404).send({ error: `This room does not exist on the goals collection` });
  }
  const roomuser = await find('roomusers', { room_id, user_id }, org);

  if (roomuser.data.data === null) {
    return res.status(404).send({
      message: 'There are no users assigned to this goal',
    });
  }

  const { _id: assignedObjectId } = roomuser.data.data[0];

  const deleteRoomUser = await deleteOne((data = 'roomusers'), (data = org), (_id = assignedObjectId));

  // Send notification to user.
  const goalRoom = room.data.data;
  await createNotification(user_id, org, room_id, goalRoom[0].goal_name, 'unassignGoal');
  // Please don't delete the above line of code. in Jesus name. It doesn't affect this controller.

  const message = {
    header: 'Goal has removed an assignee',
    goalName: goalRoom[0].goal_name,
    description: `The goal "${goalRoom[0].goal_name}" has removed an assignee `,
    createdAt: Date.now(),
    color: 'red',
    isRead: false,
    id: '',
  };

  const messageId = await insertOne('goalEvents', message, org);
  message.id = messageId.data.object_id;
  await publish('notifications', { ...message, _id: message.id });

  res.status(201).json({
    status: 'success',
    data: deleteRoomUser.data,
  });
});

exports.likeGoal = catchAsync(async (req, res, next) => {
  const { goal_id: goalId, user_id: userId, org_id: orgId } = req.query;

  // Validate the body
  await likeGoalSchema.validateAsync({
    goalId,
    userId,
    orgId,
  });

  // check that the goal_id is valid
  const goal = await find(
    'goals',
    {
      _id: goalId,
    },
    orgId
  );

  if (!goal.data.data) {
    return next(new AppError('There is no goal of this id attached to this organization id that was found.', 404));
  }

  // check if user already liked goal
  const like = await find(
    'goallikes',
    {
      goal_id: goalId,
      user_id: userId,
    },
    orgId
  );

  // add like if it doesnt exist
  if (!like.data.data) {
    addedLike = await insertOne(
      'goallikes',
      {
        goal_id: goalId,
        user_id: userId,
      },
      orgId
    );

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
  await getGoalLikesSchema.validateAsync({
    goalId,
    orgId,
  });

  // check that the goal_id is valid
  const goal = await find(
    'goals',
    {
      _id: goalId,
    },
    orgId
  );

  if (!goal.data.data) {
    return next(new AppError('There is no goal of this id attached to this organization id that was found.', 404));
  }

  // check if user already liked goal
  const like = await find(
    'goallikes',
    {
      goal_id: goalId,
    },
    orgId
  );
  if (!like.data.data) {
    return res.status(200).json({
      status: 'success',
      data: {
        count: 0,
        likes: [],
      },
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
  await likeGoalSchema.validateAsync({
    goalId,
    userId,
    orgId,
  });

  // check that the goal_id is valid
  const goal = await find(
    'goals',
    {
      _id: goalId,
    },
    orgId
  );

  if (!goal.data.data) {
    return next(new AppError('There is no goal of this id attached to this organization id that was found.', 404));
  }

  // check if user already liked goal
  const like = await find(
    'goallikes',
    {
      goal_id: goalId,
      user_id: userId,
    },
    orgId
  );
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
