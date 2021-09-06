const axios = require('axios');
const Joi = require('joi');

const catchAsync = require('../utils/catchAsync');

exports.getAllGoals = catchAsync(async (req, res, next) => {
  const goals = await axios.get(`https://test-zuri-core.herokuapp.com/crud/goals/find`);

  // Sending Responses
  res.status(200).json({ data: goals.data })
});

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  monthlyGoal: Joi.string().required(),
  quarterlyGoal: Joi.string().required(),
  biannualGoal: Joi.string().required(),
  annualGoal: Joi.string().required(),
  achieved: Joi.boolean().required(),
  createdBy: Joi.date().required(),
});

exports.createGoals = catchAsync(async (req, res, next) => {
  // Validating each property against their data type
  await schema.validateAsync(req.body);

  // Fake API
  // https://api.zuri.chat/data/write

  const goals = await axios.post(`https://zccore.herokuapp.com/data/write`, {
    plugin_id: '61330fcfbfba0a42d7f38e59',
    organization_id: '1',
    collection_name: 'goals',
    bulk_write: false,
    payload: req.body,
  });

  // Sending Responses
  res.status(200).json(goals.data);
});

exports.getSingleGoal = catchAsync(async (req, res, next) => {
  const goalId = req.params.id;
  const collectionName = 'goals';

  // for zuri core live API
  const baseUrl = 'https://zccore.herokuapp.com';
  const pluginId = '61330fcfbfba0a42d7f38e59';
  const organizationId = '1'; // Would be gotten from zuri main
  const url = `${baseUrl}/data/read/${pluginId}/${collectionName}/${organizationId}`;

  const result = await axios.get(url, { params: { _id: goalId } });
  const status = result.status || 200;
  const {data} = result;
  res.status(status).json({ data: data });
});

exports.createGoal = catchAsync(async (req, res, next) => {
  await res.status(201).send({
    message: 'Success, Goal Created',
    data: {
      title: 'Goal',
      description: 'This is a quarterly goal',
      weeklyGoal: 'false',
      monthlyGoal: 'false',
      quarterlyGoal: 'true',
      biannualGoal: 'false',
      annualGoal: 'false',
      achieved: 'false',
      createdBy: 'HR',
      createdAt: 'Wed Sep 3 2020 01:00:00 GMT+0100(WAT)',
      updatedAt: 'Wed Sep 3 2020 01:00:00 GMT+0100(WAT)',
    },
  });
});

exports.updateSingleGoalById = catchAsync(async (req, res, next) => {
  // First, Get update from req.body
  const goalId = req.params.id;
  const collectionName = 'goals';

  // Then, send update to zuri core
  // const url = `https://zccore.herokuapp.com/data/write/61330fcfbfba0a42d7f38e59/${collectionName}/${goalId}`;
  const updatedGoal = await axios.put(`https://zccore.herokuapp.com/data/write`, {
    plugin_id: '61330fcfbfba0a42d7f38e59',
    organization_id: '1',
    collection_name: collectionName,
    bulk_write: false,
    object_id: goalId,
    payload: req.body,
  })

  // send the updated goal to client.
  return res.status(200).json(updatedGoal.data);
});

exports.getArchivedGoals = catchAsync(async (req, res, next) => {
  const collectionName = 'goals';

  // for zuri core live API
  const baseUrl = 'https://zccore.herokuapp.com';
  const pluginId = '61330fcfbfba0a42d7f38e59';
  const organizationId = '1';
  const url = `${baseUrl}/data/read/${pluginId}/${collectionName}/${organizationId}`;

  // Gets all goals
  const goals = await axios.get(url);
  let archivedGoals = []

  // Checks if a goal is archived
  const goalChecker = (value) => {
    if (value.achieved === true) {
        archivedGoals.push(value)
    }
  }
  goals.data.data.forEach(goalChecker);

  if (archivedGoals.length < 1) {
    archivedGoals = 'No archived goals yet.'
  }
  // Returns all archived goals
  res.status(200).json({ status: 200, message: 'success', data: archivedGoals});
});

exports.deleteGoal = catchAsync(async (req, res, next) => {
  // Delete by Id
  const goalId = req.params.id;

  const collectionName = 'goals';

  // Then, delete from zuri core
  // const url = `https://zccore.herokuapp.com/data/write/61330fcfbfba0a42d7f38e59/${collectionName}/${goalId}`;
    await axios.delete(`https://zccore.herokuapp.com`, {
    plugin_id: '61330fcfbfba0a42d7f38e59',
    organization_id: '1',
    collection_name: collectionName,
    bulk_write: false,
    object_id: goalId,
    filter: {},
    payload: {}
  })
  // Response message.
  return res.status(200).json("Goal deleted succefully");
});
