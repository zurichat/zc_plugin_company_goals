const Joi = require('joi');

// room schema
exports.roomSchema = Joi.object({
    id:Joi.string().required().messages({
        'any.required':'uuid of the room is required'
    }),
    title:Joi.string().required().messages({
        'any.required':'title of the room is required'
    }),
    organization_id:Joi.string().required().messages({
        'any.required':'organization id is required'
    }),
})

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
    title: Joi.string().required(),
    description: Joi.string().required(),
    monthlyGoal: Joi.string().required(),
    quarterlyGoal: Joi.string().required(),
    biannualGoal: Joi.string().required(),
    annualGoal: Joi.string().required(),
    achieved: Joi.boolean().required(),
    createdBy: Joi.date().required(),
});

// mission schema
exports.missionSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});
  
// vision schema
exports.visionSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});
  