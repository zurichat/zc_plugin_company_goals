const axios = require('axios');
const Joi = require('joi');

const catchAsync = require('../utils/catchAsync');

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
  const data = await schema.validateAsync(req.body);

  const goals = await axios.post(`https://test-zuri-core.herokuapp.com/crud/goals/insert-one`, req.body);
  /* const goals = await axios.post(`https://zccore.herokuapp.com/data/write`, {
    plugin_id: 'xxx',
    organization_id: 'xxx',
    collection_name: 'goals',
    bulk_write: false,
    payload: req.body,
  }); */
  console.log(goals);
  // Sending Responses
  res.status(200).json({ status: 'success', goals: { id: goals.data.insertedId, ...data } });
});
