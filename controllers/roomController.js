const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const catchAsync = require('../utils/catchAsync')
const {insertOne} = require("../db/databaseHelper");

const roomSchema = Joi.object({
    id:Joi.string().required().messages({
        "any.required":"uuid of the room is required"
    }),
    title:Joi.string().required().messages({
        "any.required":"title of the room is required"
    }),
    organization_id:Joi.string().required().messages({
        "any.required":"organization id is required"
    }),
})

exports.createRoom = catchAsync(async (req, res, next) => {
    const {organization_id,title} = req.query;
    id = uuidv4();

    // Validate the body
    await roomSchema.validateAsync({id, organization_id,title});

    const room = await insertOne("rooms", {id, organization_id,title,users: []});

    res.status(201).json({
        status: "success",
        data: room.data
    })
});