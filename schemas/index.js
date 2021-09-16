const Joi = require('joi');


// room schema
exports.roomSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'uuid of the room is required',
  }),
  title: Joi.string().required().messages({
    'any.required': 'title of the room is required',
  }),
  organization_id: Joi.string().required().messages({
    'any.required': 'organization id is required',
  }),
  isPrivate: Joi.boolean().optional()
});

// user schema
exports.userSchema = Joi.object({
    room_id: Joi.string().required().messages({
      'any.required': 'room id is required',
    }),
    user_id: Joi.string().required().messages({
      'any.required': 'user id is required',
    }),
});

// goals schema
exports.goalsSchema = Joi.object({
  goal_name: Joi.string().required().messages({ 'any.required': 'goal name is required' }),
  createdBy: Joi.string().required().messages({ 'any.required': 'owner name is required' }),
  access: Joi.string()
    .valid(`zuri's workspace`, 'private')
    .required()
    .messages({ 'any.required': 'goal access must be defined' }),
  goal_folder: Joi.string()
    .valid(`none`, `annual`, `quarterly`)
    .default(`none`)
    .required()
    .messages({ 'any.required': 'goal folder must be added' }),
  goal_start: Joi.date().required().messages({ 'any.required': 'start date is required' }),
  goal_end: Joi.date().required().messages({ 'any.required': 'end date is required' }),
  category: Joi.string().optional(),
  description: Joi.string().optional(),
  target_type: Joi.string().valid(`number`, `currency`).optional(),
  currency_unit: Joi.string().optional(),
  start: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),
  target: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),
  milestone1: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
  milestone2: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
  milestone3: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
  milestone4: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
  goal_priority: Joi.string()
    .valid(`Low`, `Medium`, `High`, `Intermediate`)
    .required()
    .messages({ 'any.required': 'goal priority must be inputed' })
});

// mission schema
exports.missionSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().required(),
});
  
// vision schema
exports.visionSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().required(),
});
  
// likeGoal schema
exports.likeGoalSchema = Joi.object({
  goalId: Joi.string().required().messages({
    'any.required': 'goal id is required',
  }),
  userId: Joi.string().required().messages({
    'any.required': 'user id is required',
  }),
  orgId: Joi.string().required().messages({
    'any.required': 'organization id is required',
  }),
});

// getGoalLikes schema
exports.getGoalLikesSchema = Joi.object({
  goalId: Joi.string().required().messages({
    'any.required': 'goal id is required',
  }),
  orgId: Joi.string().required().messages({
    'any.required': 'organization id is required',
  }),
});