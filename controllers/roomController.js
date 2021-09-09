const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const catchAsync = require('../utils/catchAsync')
const {insertOne,deleteOne, find} = require("../db/databaseHelper");

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

const userSchema = Joi.object({
  room_id: Joi.string().required().messages({
    'any.required': 'room id is required',
  }),
  user_id: Joi.string().required().messages({
    'any.required': 'user id is required',
  }),
});

exports.joinRoom = catchAsync(async (req, res, next) => {
  const { room_id, user_id } = req.query;

  // Validate the body
  await userSchema.validateAsync({ room_id, user_id });

  //check that user isnt already in the room
  let roomuser = await find('roomusers',{room_id,user_id})

  if(roomuser.data.length <=0)
  {
     roomuser = await insertOne('roomusers', { room_id, user_id });
  }
  


  res.status(201).json({
    status: 'success',
    data: roomuser.data,
  });
});


exports.removeUserFromRoom = catchAsync(async (req,res,next)=> {
    const { room_id, user_id } = req.query;

    await userSchema.validateAsync({ room_id, user_id });

    const response = await deleteOne('roomusers',{user_id,room_id})

    res.status(201).json({
      status: 'success',
      data: response.data,
    });
})