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
  deleteMany,
  updateMany,
} = require('../db/databaseHelper');
const response = require('../helpers/response');
const {
  goalSchema,
  likeGoalSchema,
  getGoalLikesSchema,
  targetSchema,
  goalReactionSchema,
  allowedFields,
} = require('../schemas');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger.js');
const { createNotification } = require('./notificationController');
const { syncLists } = require('./syncController');

exports.sortGoalByType = async (req, res, next) => {
  const goalTypes = ['none', 'annual', 'quarterly', 'daily', 'monthly'];
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
      error: "type should either be 'annual' or 'quarterly'.",
    });
  }

  try {
    // find goals by type
    const goalsSorted = await find('goals', { goal_type: goalType }, orgId);

    // No matching data, return an empty array
    if (goalsSorted.data.data === null || goalsSorted.data.data.length < 1) {
      return res.status(200).json({ message: 'success', data: [] });
    }

    res.status(200).json({
      message: 'success',
      data: goalsSorted.data.data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'failed, server error.',
      error: error.message,
    });
  }
};

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
    if (goalType) {
      findGoals = await find('goals', { goal_type: goalType }, orgId);
    } else {
      findGoals = await findAll('goals', orgId);
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
          sorted = goals.sort((a, b) => {
            const c = String(a.category).toLowerCase().trim();
            const d = String(b.category).toLowerCase().trim();

            if (c < d) {
              return -1;
            }
            if (c === d) {
              return 0;
            }
            return 1;
          });
        } else if (sort === 'goal_name') {
          logger.info('sort goals by goal name');
          sorted = goals.sort((a, b) => {
            const c = String(a.goal_name).toLowerCase().trim();
            const d = String(b.goal_name).toLowerCase().trim();

            if (c < d) return -1;
            if (c === d) return 0;
            return 1;
          });
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
      return response(res, 'success', 200, 'goals retrieved successfully', newGoals);
    }
  } catch (error) {
    logger.info('no goals for this organization');
    // console.log(error);
    return response(res, 'success', 200, 'no goals for this organization', []);
  }
});

exports.createGoal = catchAsync(async (req, res, next) => {
  const roomId = uuidv4();
  const goal = req.body;
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  const { org_id: orgId } = req.query;
  const { goal_name: title, category } = req.body;

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

    await syncLists(req.tokenHeader, orgId);

    const newGoal = await insertOne('goals', data, orgId);

    // keeping track of organizations
    let org = await find('orgs', { orgId }, 'fictionalorganisationtokeeptrack');
    org = org.data.data;

    if (org === null || !org[0].orgId || org.length < 1) {
      await insertOne('orgs', { orgId }, 'fictionalorganisationtokeeptrack');
    }

    if (newGoal.data.status === 200) {
      await insertOne('goals', { goal_id: newGoal.data.data.object_id, reactions: [], org_id: orgId }, orgId);
      await createNotification(orgId, roomId, title, 'createGoal');
      logger.info(`Successfully created a new goal: ${goals.data.data}`);
      res.status(200).json({ message: 'success', data });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid request' });
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
      return res.status(400).send({ status: 'failed', message: `property '${property}' not allowed` });
    }
  }

  try {
    const goals = await findById('goals', goalId, orgId);
    // Then, send update to zuri core
    logger.info(`Updating goal with id: ${goalId} with data: ${updateFields}`);
    await updateOne('goals', req.body, {}, orgId, goalId);
  } catch (error) {
    // console.log(error);
  }

  // Send notifications to all users.
  const updatedGoal = await find('goals', { _id: goalId }, orgId);
  const { goal_name, room_id } = updatedGoal.data.data;

  if (req.body.is_expired === true) {
    await createNotification(orgId, room_id, goal_name, 'expiredGoal');
  } else if (req.body.is_completed === true) {
    await createNotification(orgId, room_id, goal_name, 'achievedGoal');
  } else {
    await createNotification(orgId, room_id, goal_name, 'updatedGoal');
  }

  // send the updated goal to client.
  logger.info(`Successfully updated the goal and got the response: ${updatedGoal.data.data}`);
  return res.status(200).json({
    status: 200,
    message: 'success',
    data: updatedGoal.data.data,
  });
});

exports.deleteGoalById = catchAsync(async (req, res, next) => {
  // First, Get the goalId & orgid from req.params
  const { goal_id: id, org_id: org } = req.query;

  logger.info(`Would attempt to delete goal for ${org} with id: ${id}`);

  // The organization id is required.
  if (!org) {
    logger.info('please provide an organization id.');
    return res.status(400).send({ error: 'Organization_id is required' });
  }

  // find the goal first to ensure the goal was created by the organization
  logger.info(`Checking to make sure the organization that deleted is the one deleting.`);
  const goal = await find('goals', { _id: id }, org);

  if (!goal.data.data) {
    logger.info('Wrong organization id provided.');
    return res
      .status(404)
      .send({ error: 'There is no goal of this id attached to this organization id that was found.' });
  }

  const { room_id: roomId, goal_name } = goal.data.data;

  // Then, delete the goal.
  const response = await deleteOne('goals', org, id);

  await deleteMany('goalReactions', { goal_id: id }, org);

  // Send a notification to each user.
  await createNotification(org, roomId, goal_name, 'deleteGoal');

  logger.info(`Successfully deleted the goal with id: ${id}`);
  res.status(200).json({ status: 200, message: 'Goal deleted successfully.', response: response.data.data });
});

exports.setGoalReaction = catchAsync(async (req, res, next) => {
  const { goal_id, org_id, member_id } = req.query;
  const { reaction } = req.body;

  const data = {
    member_id,
    reaction,
  };

  try {
    await goalReactionSchema.validateAsync(data);
    logger.info(`Successfully validated the request body.`);
  } catch (error) {
    logger.info(`There are errors with the request body: ${JSON.stringify(error.details)}`);
    return res.status(400).json(error.details);
  }

  const {
    data: { data: goalDetail },
  } = await find('goals', { goal_id, org_id }, org_id);
  let { reactions } = goalDetail[0];

  try {
    if (reactions.filter((e) => e.member_id === data.member_id).length > 0) {
      if (reactions.filter((e) => e.member_id === data.member_id && e.reaction === data.reaction).length > 0) {
        reactions = reactions.filter((e) => e.member_id !== data.member_id);
      } else {
        const memberIndex = reactions.findIndex((e) => e.member_id === data.member_id);
        reactions[memberIndex].reaction = data.reaction;
      }
    } else {
      reactions.push(data);
    }
  } catch (error) {
    return res.status(400).send({ status: 400, message: 'failed', data: error.details });
  }

  try {
    const {
      data: { data },
    } = await updateOne('goals', { reactions }, { goal_id, org_id }, org_id);

    return res.status(200).json({ status: 200, message: 'success', data });
  } catch (error) {
    return res.status(400).json({ status: 400, message: 'failed', data: error.details });
  }
});

exports.getGoalReactions = catchAsync(async (req, res, next) => {
  const { org_id, goal_id } = req.query;

  logger.info(`Getting all the reactions (likes & dislikes) for the goal: ${goal_id}`);

  // The organization id is required.
  if (!org_id) {
    logger.info('please provide an organization id.');
    res.status(400).send({ error: 'organization_id is required' });
  }
  if (!goal_id) {
    logger.info('please provide a goal id.');
    res.status(400).send({ error: 'goal_id is required' });
  }

  logger.info('Checking to ensure that the goal exists for the organisation.');
  const goal = await find('goals', { _id: goal_id }, org_id);

  if (goal.data.data === null) {
    return res.status(400).send({ error: `The goal with the goal id of ${goal_id} does not exist` });
  }

  try {
    const goalReactions = await find('goals', { org_id, goal_id }, org_id);
    return res.status(200).json({ status: 200, message: 'success', data: goalReactions.data.data });
  } catch (error) {
    return res.status(400).send({ status: 400, message: 'failed', data: error.details });
  }
});
