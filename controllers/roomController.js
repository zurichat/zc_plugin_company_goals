const Joi = require('joi')


const goalSchema = Joi.object({
    id:Joi.string().required().messages({
        "any.required":"uuid of the rom is required"
    }),
    organization_id:Joi.string().required().messages({
        "any.required":"organization id is required"
    })
})