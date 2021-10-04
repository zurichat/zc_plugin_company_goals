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
  progress: Joi.number().required()
});

// target schema (please, im begging you, DO NOT touch this schema @Odogwu)
exports.targetSchema = Joi.object({
  target: [Joi.string().optional(), Joi.number().optional()],
  milestones: Joi.any()
    .optional()
    .when('target', {
      is: Joi.number().optional(),
      then: Joi.array()
        .optional()
        .items(
          Joi.object()
            .keys({
              1: Joi.object({ value: Joi.number(), achieved: Joi.boolean().default(false) }).optional(),
              2: Joi.object({
                value: Joi.number().allow().default('0').optional(),
                achieved: Joi.boolean().default(false).optional(),
              })
                .default()
                .optional(),
              3: Joi.object({
                value: Joi.number().allow().default('0').optional(),
                achieved: Joi.boolean().default(false).optional(),
              })
                .default()
                .optional(),
              4: Joi.object({
                value: Joi.number().allow().default('0').optional(),
                achieved: Joi.boolean().default(false).optional(),
              })
                .default()
                .optional(),
            })
            .optional()
        )
        .required(),
      otherwise: Joi.string().optional(),
    }),
  //milestone: Joi.string().when('type', { is: Joi.string(), then: Joi.required()}),
  achieved: Joi.boolean().default(false).optional(),
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

exports.goalReactionSchema = Joi.object({
  goal_id: Joi.string().required().messages({
    'any.required': 'goal id is required',
  }),
  reactions: Joi.array().items(
    Joi.object().keys({
      user_id: Joi.string().required().messages({'any.reuired': 'The user_id is a reuired field'}),
      reaction: Joi.string().valid('like', 'dislike', 'none').required().messages({'messages': 'You need to set a user reaction'})
    })
  ),
  org_id: Joi.string().required().messages({
  'any.required': 'organization id is required',
}),
});


exports.allowedFields = [
    'category',
    'description',
    'due_date',
    'goal_name',
    'goal_type',
    'is_complete',
    'is_expired',
  'start_date'
  ];