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
exports.goalSchema = Joi.object({
  goal_name: Joi.string().required().messages({
    'any.required': 'goal name is required',
  }),
  description: Joi.string().optional(),
  start_date: Joi.date().required().messages({
    'any.required': 'Start date is required',
  }),
  due_date: Joi.date().required().messages({
    'any.required': 'Due date is required',
  }),
  goal_type: Joi.string().valid(`none`, `annual`, `quarterly`, `daily`, `monthly`).default(`none`).required().messages({
    'any.required': 'goal type must be added',
  }),
  category: Joi.string().required().messages({
    'any.required': 'Category is required',
  }),
});

// target schema
exports.targetSchema = Joi.object({
  target: [Joi.string().required(), Joi.number().required()],
  milestone: Joi.array().when('type',
   { 
      is: Joi.number(),
      then: Joi.array().items({
        first_milestone: Joi.number().default(0).required(),
        second_milestone: Joi.number().default(0).required(),
        third_milestone: Joi.number().default(0).required(),
        last_milestone: Joi.number().default(0).required(),
      }),
  }),
  achieved: Joi.boolean().default(`false`).required()
})

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
