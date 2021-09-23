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

// notifications schema
exports.notificationSchema = Joi.object({
  user_id: Joi.string().required(),
  org_id: Joi.string().required(),
  goal_id: Joi.string().required(),
  header: Joi.string().required(),
  goalName: Joi.string().required(),
  isRead: Joi.boolean().required(),
  colour: Joi.string().required(),
  description: Joi.string().required(),
  createdAt: Joi.date().timestamp()
})