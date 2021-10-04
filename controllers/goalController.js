/* eslint-disable no-useless-escape */
/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { object } = require('joi');
const { v4: uuidv4 } = require('uuid');
const {
  find,
  findAll,
  findById,
  insertOne,
  insertMany,
  deleteOne,
  updateOne,
  deleteMany, updateMany,
} = require('../db/databaseHelper');
const { goalSchema, likeGoalSchema, getGoalLikesSchema, targetSchema, goalReactionSchema, allowedFields} = require('../schemas');
const AppError = require('../utils/appError');
const {average, calculate, reduceCalculation} = require('../utils/calculate');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger.js');
const { createNotification } = require('./notificationController');

const user_ids = ['6145cf0c285e4a1840207426', '6145cefc285e4a1840207423', '6145cefc285e4a1840207429'];


exports.sortGoalByType = async (req, res, next)=>{
  const goalTypes = ['none', 'annual', 'quarterly', 'daily', 'monthly']
  const { org_id: orgId, type: goalType } = req.query;

  if (!orgId) {
    return res.status(400).send({
      error: 'org_id is required',
    });
  }
  if (!goalType) {
    return res.status(400).send({
      error: 'type is required',
    });
  }
  if (!goalTypes.includes(goalType)) {
    return res.status(400).send({
      error: "type should either be 'annual' or 'quarterly'."
    });
  }

  try {
    // find goals by type
    const goalsSorted = await find('goals', { goal_type: goalType }, orgId);

    // No matching data, return an empty array
    if (goalsSorted.data.data === null || goalsSorted.data.data.length < 1)
    {
      return res.status(200).json({ message: 'success', data: [] });
    }
      
    res.status(200).json({
      message: 'success',
      data: goalsSorted.data.data,
    });
  } 
  catch (error) {
   
    res.status(500).json({
      status: 500,
      message: 'failed, server error.',
      error: error.message
    });
  }
}

exports.getAllGoals = catchAsync(async (req, res, next) => {
  const { org_id: orgId, page, limit, sort, type: goalType } = req.query;

  if (!orgId) {
     logger.info(`Can't get goals for null organisation id... Exiting...`);
    return res.status(400).send({ error: 'org_id is required' });
  }

  // Search for all Goals
  try {
    logger.info(`Started getting all goals for the organization: ${orgId}`);
    let findGoals;
    if(goalType)
    {
      findGoals = await find('goals', { goal_type: goalType }, orgId);
    }
    else
    {
      findGoals = await findAll('goals', orgId)
    }
    const { data: goals } = findGoals.data;

    // No matching data, return an empty array
    if (goals === null || goals.length < 1) return res.status(200).json({ message: 'success', data: [] });

    let sorted;
    // 200, response
    if (findGoals.data.status === 200 && goals.length > 0) {
      sorted = goals
        .sort((a, b) => {
          const c = new Date(a.created_at);
          const d = new Date(b.created_at);
          return c - d;
        })
        .reverse();

      if (sort && sort !== 'created_at') {
        if (sort === 'due_date') {
          logger.info('sort by due date');
          sorted = goals
            .sort((a, b) => {
              const c = new Date(a.due_date);
              const d = new Date(b.due_date);
              return c - d;
            })
            .reverse();
        } else if (sort === 'category') {
          logger.info('sort goals by category');
          sorted = goals
            .sort((a, b) => {
              const c = String(a.category).toLowerCase().trim()
              const d = String(b.category).toLowerCase().trim()

              if(c<d)
              {
                return -1
              }
              if(c===d)
              {
                return 0
              }
              return 1;
            })
        }
        else if(sort === 'goal_name'){
          logger.info('sort goals by goal name');
          sorted = goals
            .sort((a, b) => {
              const c = String(a.goal_name).toLowerCase().trim()
              const d = String(b.goal_name).toLowerCase().trim()

              if(c < d) return -1;
              if(c === d) return 0;
              return 1;
            })
        }
      }

      let newGoals = sorted;
      if (page && limit) {
        const newPage = page * 1 || 1;
        const perPage = limit * 1 || 5;

        // Calculate the start and end index
        const start = (newPage - 1) * perPage;
        const end = newPage * perPage;

        // Paginated goals
        newGoals = newGoals.slice(start, end);
        return res.status(200).json({
          status: 200,
          message: 'success',
          currentPage: newPage,
          totalDocuments: goals.length,
          documentPerPage: limit * 1,
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
    logger.info('no goals for this organization');
    console.log(error)
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: [],
    });
  }
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
}

const findTarget = async (org_id, res) => {
  let targets;
  try {
    targets = await findAll('targets', org_id);
    // consolelog(targets)
    return targets;
  } catch (err) {
    if (err) return res.status(400).json(err.details);
  }
}

exports.averageGoalProgress = catchAsync(async (req, res, next) => {
  // const {org_id} = req.query;
  // const dataGoal = await findGoal(org_id, res)
  // const dataTarget = await findTarget(org_id, res)
  // let goals = dataGoal.data.data;
  // let targets = dataTarget.data.data;

  // console.log(goals)
  // console.log(targets)

  // Make the calculation
  // const result = calculate(goals, targets);
  // const reduceResult = reduceCalculation(result);
  // const averageResult = average(reduceResult);
  // console.log(averageResult);

  // // Dummy data
  // const result = calculate(goalId, targets);
  // const reduceResult = reduceCalculation(result);
  // const averageResult = average(reduceResult);
  // console.log(averageResult);

  // Response
  return res
    .status(200)
    .json({
      status: 'success',
      averageResult:0
  })
});

exports.individualGoalProgress =  catchAsync(async (req, res, next) => {
  const { org_id } = req.query;
  const dataGoal = await findGoal(org_id, res)
  const dataTarget = await findTarget(org_id, res)
  let goals = dataGoal.data.data;
  let targets = dataTarget.data.data;

  // console.log(goals)
  // console.log(targets)

  // Make the calculation
  const result = calculate(goals, targets);
  const reduceResult = reduceCalculation(result);
  console.log(reduceResult);
})

exports.createGoal = catchAsync(async (req, res, next) => {
  const roomId = uuidv4();
  const goal = req.body;
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  const { org_id: orgId } = req.query;
  const { goal_name: title, category } = req.body;

  let goals;


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
        is_complete: false,
        is_expired: false,
        progress: 0,
        created_at: date,
        ...goal,
      };

      goals = await insertOne('goals', data, orgId);
      await insertOne('goalReactions', {goal_id: goals.data.data.object_id, reactions: [], orgId}, orgId);

    // keeping track of organizations
    let org = await find('orgs', { orgId }, 'fictionalorganisationtokeeptrack');
      org = org.data.data;

    if (org === null || !org[0].orgId || org.length < 1) {
      await insertOne('orgs', { orgId }, 'fictionalorganisationtokeeptrack');
    }

      if (goals.data.status === 200) {
        await createNotification(user_ids, orgId, roomId, title, 'createGoal');
        logger.info(`Successfully created a new goal: ${goals.data.data}`);
        res.status(200).json({ message: 'success', data });
      }
    } catch (error) {

      return res.status(400).send({ message: 'Invalid request' });
    }
  })

exports.deleteTarget = catchAsync(async (req, res, next) => {
  await deleteMany('targets', {}, req.query.org);
  res.status(200).send('hi')
})

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

  if(target.type === 'numeric') {
    data = {
        goal_id,
        targets:[
          target,
        ]
      };
  } else {
    data = {
        goal_id,
        target:{
          target,
        }
      };
  }
    console.log(data)


  // store the total targets for a goal with the goal_id as the primary key
  // const total_targets = [ target, ];
  // console.log(total_targets)
  
  logger.info(`Started creating targets for goal with id api/v1/targeets?org_ -> ${goal_id}`);

  try{
    console.log("Started validating req.body");
    // Validate the request body before creating
    await targetSchema.validateAsync(req.body);
    
    // Check if we didn't have an existing 
    const foundTarget = await find('targets', {goal_id}, org_id);
    const newFoundTarget = foundTarget.data.data;

    if(newFoundTarget !== null) {
      return res.status(400).json({ status: 400, message: 'A target already exist for this goal id' });
    }

    // Create a  new target
    const newTarget = await insertOne('targets', data, org_id);
    const allTarget = await findAll('targets', org_id);
    console.log(allTarget.data.data);
    logger.info(`Target created for goal with id ${goal_id}: ${newTarget}`);

    // Response
    return res.status(200).json({ status: 200, data})
  }
  catch(err){
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

exports.getGoalProgress = catchAsync(async (req, res, next) => {
  const { org_id, goal_id } = req.query;

  logger.info(`Getting goal progress for ${org_id}`);

  if (!org_id) {
    logger.info(`Organization id isn't provided.`);
    return res.status(400).send({ error: 'Organization_id is required' });
  }

  try {
    const goalProgress = 67;
    return res.status(200).json({ status: 200, data: goalProgress });
  } catch (err) {
    if (err) return res.status(400).json(err.details);
  }
});

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
  const updateFields = req.body;

  for (const property in updateFields) {
    if (!allowedFields.includes(property)) {
     return res.status(400).send({status: 'failed', message: `property '${property}' not allowed`})
    }
 }
  
  try {
    const goals = await findById('goals', goalId, orgId);
    // Then, send update to zuri core
    logger.info(`Updating goal with id: ${goalId} with data: ${updateFields}`);
     await updateOne('goals', req.body, {}, orgId, goalId);
  
  } catch (error) {
    console.log(error)
  }
      
     
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

  await deleteMany('goalReactions', {goal_id: id}, org);

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
  try {
    const goal = await find(
      'goals',
      {
        _id: goalId,
      },
      orgId
    );

    if (goal.data.data === null) {
      return res.status(400).send({ error: `The goal with the goal id of ${goalId} does not exist` });
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
    if (like.data.data === null) {
      // check if dislike exists and remove
      const disLike = await find(
        'goaldislikes',
        {
          goal_id: goalId,
          user_id: userId,
        },
        orgId
      );
      if (disLike.data.data !== null) {
        await deleteOne('goaldislikes', orgId, disLike.data.data[0]._id);
      }

      // add like
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
        data: { count: addedLike.data.data.insert_count },
      });
    }

    const removeLike = await deleteOne('goallikes', orgId, like.data.data[0]._id);
    // delete like from db

    res.status(200).json({
      status: 'success',
      message: 'Goal like removed',
      data: { count: removeLike.data.data.deleted_count },
    });
  } catch (error) {
    res.status(500).json({ status: 'failed', message: 'server Error', data: null });
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
    return res.status(400).send({ error: `The goal with the goal id of ${goalId} does not exist` });
  }

  // check if user already liked goal
  const like = await find(
    'goallikes',
    {
      goal_id: goalId,
    },
    orgId
  );

  if (like.data.data === null) {
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

  if (goal.data.data === null) {
    return res.status(400).send({ error: `The goal with the goal id of ${goalId} does not exist` });
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
  if (like.data.data === null) {
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

  try {
    // check that the goal_id is valid
    const goal = await find(
      'goals',
      {
        _id: goalId,
      },
      orgId
    );

    if (goal.data.data === null) {
      return res.status(400).send({ error: `The goal with the goal id of ${goalId} does not exist` });
    }

    // check if user already disliked goal
    const disLike = await find('goaldislikes', { goal_id: goalId, user_id: userId }, orgId);

    // add dislike if it doesnt exist
    if (disLike.data.data === null) {
      // check if like exists and remove
      const like = await find(
        'goallikes',
        {
          goal_id: goalId,
          user_id: userId,
        },
        orgId
      );
      if (like.data.data !== null) {
        await deleteOne('goallikes', orgId, like.data.data[0]._id);
      }

      // add dislike
      addedDisLike = await insertOne('goaldislikes', { goal_id: goalId, user_id: userId }, orgId);

      return res.status(201).json({
        status: 'success',
        message: 'Goal dislike added',
        data: { count: addedDisLike.data.data.insert_count },
      });
    }

    removeDisLike = await deleteOne('goaldislikes', orgId, disLike.data.data[0]._id);
    // delete dislike from db
    res.status(200).json({
      status: 'success',
      message: 'Goal dislike removed',
      data: { count: removeDisLike.data.data.deleted_count },
    });
  } catch (error) {
    res.status(500).json({ status: 'failed', message: 'server Error', data: null });
  }
});

exports.getGoalDisLikes = catchAsync(async (req, res, next) => {
  const { goal_id: goalId, org_id: orgId } = req.query;

  // Validate the body
  await getGoalLikesSchema.validateAsync({ goalId, orgId });

  // check that the goal_id is valid
  const goal = await find(
    'goals',
    {
      _id: goalId,
    },
    orgId
  );

  if (goal.data.data === null) {
    return res.status(400).send({ error: `The goal with the goal id of ${goalId} does not exist` });
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
  const goal = await find(
    'goals',
    {
      _id: goalId,
    },
    orgId
  );

  if (goal.data.data === null) {
    return res.status(400).send({ error: `The goal with the goal id of ${goalId} does not exist` });
  }

  // check if user already disliked goal
  const disLike = await find('goaldislikes', { goal_id: goalId, user_id: userId }, orgId);
  if (disLike.data.data === null) {
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

exports.setGoalReaction = catchAsync(async (req, res, next) => {

  const { goal_id, org_id} = req.query;
  const {reaction, _id} = req.body;

  const reactions = [];
  reactions.push(reaction);

  const data = {
    goal_id,
    reactions,
    org_id
  }

  try {
    await goalReactionSchema.validateAsync(data);
    logger.info(`Successfully validated the request body.`);
  } catch (err) {
    logger.info(`There are errors with the request body: ${JSON.stringify(err.details)}`);
    if (err) return res.status(400).json(err.details);
  }

  const goalReactions = await find('goalReactions', {goal_id}, org_id);

  const goalReactionsData = goalReactions.data.data[0];

  if (goalReactionsData.reactions.filter(e => e.user_id === reactions[0].user_id).length > 0) {
    const userIndex = goalReactionsData.reactions.findIndex(e => e.user_id === reactions[0].user_id);
    goalReactionsData.reactions[userIndex].reaction = reactions[0].reaction;


  } else {
    goalReactionsData.reactions.push(reaction);
  }

  try {
    const updatedGoalReactions = await updateOne('goalReactions', { reactions }, {}, org_id, _id);

    return res.status(200).json({ status: 200, message: 'success', data: updatedGoalReactions.data.data });
  } catch (err) {
    if (err)
      return res.status(400).json({status: 400, message: 'failed', data: err.details });
  }

})

exports.getGoalReaction = catchAsync(async (req, res, next) => {
  const {goal_id, org_id} = req.query;

  logger.info(`Getting all the reactions (likes & dislikes) for the goal: ${goal_id}`);

  // The organization id is required.
  if (!org_id) {
    logger.info('please provide an organization id.');
    res.status(400).send({ error: 'Organization_id is required' });
  }

  logger.info("Checking to ensure that the goal exists for the organisation.")
  const goal = await find('goals', { _id: goal_id }, org_id);

  if (goal.data.data === null) {
    return res.status(400).send({ error: `The goal with the goal id of ${goal_id} does not exist` });
  }

  try {
    const goalReactions = await find('goalReactions', {goal_id}, org_id);
    return res.status(200).json({ status: 200, message: 'success', data: goalReactions.data.data, });
  } catch (err) {
    if (err)
      return res.status(400).send({status: 400, message: 'failed', data: err.details });
  }
})