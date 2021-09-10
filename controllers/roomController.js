/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const {insertOne,deleteOne, find} = require('../db/databaseHelper');
const { roomSchema, userSchema } = require('../schemas');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.createRoom = catchAsync(async (req, res, next) => {
    const {organization_id,title} = req.query;
    const id = uuidv4();

    // Validate the body
    await roomSchema.validateAsync({id, organization_id,title});

    const room = await insertOne('rooms', {id, organization_id,title},organization_id);

    res.status(201).json({
        status: 'success',
        data: room.data
    })
});


//gets all rooms for an organization
exports.getAllRooms = catchAsync(async (req, res, next) => {
  
  const {organization_id} = req.query;

  const rooms = await find('rooms',{organization_id});


  if(rooms.data.data.length == 0){
    res.status(404).json({status: "failed", message: "Room List is empty ", data: null})
  }

  if(rooms.data.data.length >= 1){
    res.status(200).json({status: "success", message: "Room List found", data: rooms.data})
  }

  else{
    res.status(500).json({message: "Server Error, Try again"})
  }

});

exports.joinRoom = catchAsync(async (req, res, next) => {
  const { room_id, user_id, organization_id } = req.query;

  // Validate the body
  await userSchema.validateAsync({ room_id, user_id });

  // check that the room_id is valid
  const room = await find('rooms',{id:room_id,organization_id})

  if(room.data.data.length<=0)
  {
    return next(new AppError('Room not found',404))
  }
  // check that user isnt already in the room
  let roomuser = await find('roomusers',{room_id,user_id})

  if(roomuser.data.data.length >0)
  {
    return next(new AppError('user already in room',400))
  }

  roomuser = await insertOne('roomusers', { room_id, user_id },organization_id);

  


  res.status(201).json({
    status: 'success',
    data: roomuser.data,
  });
});


exports.removeUserFromRoom = catchAsync(async (req,res,next)=> {
    const { room_id, user_id, organization_id } = req.query;

    await userSchema.validateAsync({ room_id, user_id });

    const response = await deleteOne('roomusers',{user_id,room_id},organization_id)

    res.status(201).json({
      status: 'success',
      data: response.data,
    });
})