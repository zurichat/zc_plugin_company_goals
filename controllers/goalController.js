/* eslint-disable no-var */
/* eslint-disable quotes */
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
const { createNotification } = require('./notificationController');

const user_ids = ['6145cf0c285e4a1840207426', '6145cefc285e4a1840207423', '6145cefc285e4a1840207429'];

exports.getAllGoals = catchAsync(async (req, res, next) => {
  const { org_id: orgId, page, limit } = req.query;

  if (!orgId) {
    logger.info(`Can't get goals for null organisation id... Exiting...`);
    return res.status(400).send({ error: 'org_id is required' });
  }

  // Search for all Goals
  try {
    logger.info(`Started getting all goals for the organization: ${orgId}`);
    const findGoals = await findAll('goals', orgId);
    const { data: goals } = findGoals.data;

    // No matching data, return an empty array
    if (goals === null || goals.length < 1) return res.status(200).json({ message: 'success', data: [] });

    // 200, response
    if (findGoals.data.status === 200 && goals.length > 0) {
      const sorted = goals
        .sort((a, b) => {
          const c = new Date(a.created_at);
          const d = new Date(b.created_at);
          return c - d;
        })
        .reverse();

      let newGoals = sorted;
      if (page && limit) {
        const newPage = page * 1 || 1;
        const perPage = limit * 1 || 5;

        // Calculate the start and end index
        const start = (newPage - 1) * perPage;
        const end = newPage * perPage;

        // Paginated goals
        newGoals = data.slice(start, end);

        return res.status(200).json({
          status: 200,
          message: 'success',
          currentPage: newPage,
          totalDocuments: data.length,
          documentPerPage: newGoals.length,
          data: newGoals,
        });
      }

      // Sending response
      return res.status(200).json({
        status: 200,
        message: 'success',
        data: newGoals,
      });
    }
  } catch (error) {
    //if (error) return res.status(404).send({ message: `Could not find goals for the organization ${orgId}` });
    logger.info('no goals for this organization')
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: [],
    });
  }
});

exports.createGoal = async (req, res, next) => {
  logger.info(`Started creating a new goal.`);

  const roomId = uuidv4();
  const { org_id: orgId } = req.query;
  const { goal_name: title, category, start_date, due_date } = req.body;

  const goal = req.body;
  let goals;

  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  if (!orgId) {
    logger.info(`Unable to create a goal as organization id isn't provided.`);
    res.status(400).send({ error: 'Organization_id is required' });
    return;
  }

  try {
    await goalSchema.validateAsync(req.body);
    logger.info(`Successfully validated the request body.`);
    // const date_regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

    // const d1 = new Date(start_date);
    // const d2 = new Date(due_date);

    // if (!date_regex.test(start_date) || !date_regex.test(due_date)) {
    //   return res
    //     .status(400)
    //     .send({ Validation_error: `Start and due dates should be in the format YYYY-MM-DD or YYYY-M-D` });
    // }

    // if (d1.getMonth() < today.getMonth() || d1.getDate() < today.getDate()) {
    //   return res.status(400).send({ message: 'Start date or month must not be before today' });
    // }
    // if (d2.getMonth() < today.getMonth() || d2.getDate() < today.getDate()) {
    //   return res.status(400).send({ message: 'Due date or month must not be before today' });
    // }
  } catch (err) {
    logger.info(`There are errors with the request body: ${err.details}`);
    if (err) return res.status(400).json(err.details);
  }

  try {
    logger.info(
      `Checking to ensure there are no goals with the title: ${title} that belong to the ${category} category.`
    );
    const findGoals = await find('goals', { goal_name: title }, orgId);

    const { data: foundGoal } = findGoals.data;

    if (foundGoal[0].goal_name === title && foundGoal[0].category === category) {
      logger.info(`You are not allowed to create a goal with the same name as a previous goal.`);
      return res.status(400).send({
        error: `Goal with the title: '${title}' and  category: '${category}' already exists on your organization`,
      });
    }
  } catch (error) {
    logger.info(`There are no goals with the title: ${title}`);
    if (error) goals = error.message;
  }

  try {
    const data = {
      room_id: roomId,
      isComplete: false,
      isExpired: false,
      created_at: date,
      ...goal,
    };

    goals = await insertOne('goals', data, orgId);

    if (goals.data.status === 200) {
      await createNotification(user_ids, orgId, roomId, title, 'createGoal');
      logger.info(`Successfully created a new goal: ${goals.data.data}`);
      res.status(200).json({ message: 'success', data });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid request' });
  }
};

exports.getSingleGoal = catchAsync(async (req, res, next) => {
  logger.info(`Started getting a single goal by its UUID.`);

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

  const goals = await findById('goals', { _id: goalId }, orgId);
  // Then, send update to zuri core
  logger.info(`Updating goal with id: ${goalId} with data: ${req.body}`);
  await updateOne('goals', req.body, {}, orgId, goalId);

  // Send notifications to all users.
  const updatedGoal = await find('goals', { _id: goalId }, orgId);
  const { goal_name, room_id } = updatedGoal.data.data;

  if (req.body.is_expired === true) {
    await createNotification(user_ids, orgId, room_id, goal_name, 'expiredGoal');
  } else if (req.body.is_completed === true) {
    await createNotification(user_ids, orgId, room_id, goal_name, 'achievedGoal');
  } else {
    await createNotification(user_ids, orgId, room_id, goal_name, 'updatedGoal');
  }

  // send the updated goal to client.
  logger.info(`Successfully updated the goal and got the response: ${updatedGoal.data.data}`);
  return res.status(200).json({
    status: 200,
    message: 'success',
    data: updatedGoal.data.data,
  });
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
  const { room_id: roomId, goal_name } = goal.data.data;

  // delete assigned records
  await deleteMany('roomusers', { room_id: roomId }, org);

  // Then, delete the goal.
  const response = await deleteOne('goals', org, id);

  // Send a notification to each user.
  await createNotification(user_ids, org, roomId, goal_name, 'deleteGoal');

  logger.info(`Successfully deleted the goal with id: ${id}`);
  res.status(200).json({ status: 200, message: 'Goal deleted successfully.', response: response.data.data });
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
      // await createNotification(user_id, org, room_id, data.title, 'assignGoal');

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
  // const goalRoom = room.data.data;
  // await createNotification(user_id, org, room_id, goalRoom[0].goal_name, 'unassignGoal');

  return res.status(201).json({
    status: 'success',
    message: `This goal has been unassigned from user: ${user_id}`,
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
  try{
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
   const addedLike = await insertOne(
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
      data: {count: addedLike.data.data.insert_count}
    });
  }

  const removeLike = await deleteOne('goallikes', orgId, like.data.data[0]._id);
  // delete like from db


  res.status(201).json({
    status: 'success',
    message: 'Goal like removed',
    data: {count: removeLike.data.data.deleted_count}
  });
}
catch(error){
  res.status(500).json({status: 'failed', message: 'server Error', data: null})
}

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

  if (goal.data.data === null) {
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

exports.disLikeGoal = catchAsync(async (req, res, next) => {
  const { goal_id: goalId, user_id: userId, org_id: orgId } = req.query;

  // Validate the body
  await likeGoalSchema.validateAsync({ goalId, userId, orgId });

  // check that the goal_id is valid
  const goal = await find('goals', { goalId }, orgId);

  if (!goal.data.data) {
    return next(new AppError('There is no goal of this id attached to this organization id that was found.', 404));
  }

  // check if user already disliked goal
  const disLike = await find('goaldislikes', { goal_id: goalId, user_id: userId }, orgId);

  // add dislike if it doesnt exist
  if (!disLike.data.data) {
    addedDisLike = await insertOne('goalldislikes', { goal_id: goalId, user_id: userId }, orgId);

    return res.status(201).json({
      status: 'success',
      message: 'Goal dislike added',
      data: {},
    });
  }

  removeDisLike = await deleteOne('goaldislikes', orgId, disLike.data.data[0]._id);
  // delete dislike from db
  res.status(201).json({
    status: 'success',
    message: 'Goal dislike removed',
    data: {},
  });
});

exports.getGoalDisLikes = catchAsync(async (req, res, next) => {
  const { goal_id: goalId, org_id: orgId } = req.query;

  // Validate the body
  await getGoalLikesSchema.validateAsync({ goalId, orgId });

  // check that the goal_id is valid
  const goal = await find('goals', { _id: goalId }, orgId);

  if (!goal.data.data) {
    return next(new AppError('There is no goal of this id attached to this organization id that was found.', 404));
  }

  // check if user already disliked goal
  const disLike = await find('goaldislikes', { goal_id: goalId }, orgId);
  if (!disLike.data.data) {
    return res.status(200).json({
      status: 'success',
      data: { count: 0, disLikes: [] },
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      count: disLike.data.data.length,
      disLikes: disLike.data.data,
    },
  });
});

exports.checkUserDisLikes = catchAsync(async (req, res, next) => {
  const { goal_id: goalId, user_id: userId, org_id: orgId } = req.query;

  // Validate the body
  await likeGoalSchema.validateAsync({ goalId, userId, orgId });

  // check that the goal_id is valid
  const goal = await find('goals', { _id: goalId }, orgId);

  if (!goal.data.data) {
    return next(new AppError('There is no goal of this id attached to this organization id that was found.', 404));
  }

  // check if user already disliked goal
  const disLike = await find('goaldislikes', { goal_id: goalId, user_id: userId }, orgId);
  if (!disLike.data.data) {
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

exports.sortGoalByType = catchAsync(async (req, res, next) => {
  const { org_id: orgId, type: goalType } = req.query;

  try{
        //find goals by type
      const goalsSorted = await find('goals', { goal_type: goalType }, orgId);

      // No matching data, return an empty array
      if (goalsSorted.data.data === null || goalsSorted.data.data.length < 1)
            return res.status(200).json({ message: 'success', data: [] });
      res.status(200).json({
        message: 'success',
        data: goalsSorted.data.data,
      });
  }
  catch(error){
    console.log(error.message)
    res.status(500).json({message: 'failed, server error', data: null})
  }
 
});
