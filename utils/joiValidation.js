const Joi = require('joi');

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

exports.schema = schema;
