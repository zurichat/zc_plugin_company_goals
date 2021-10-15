/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const { insertOne, deleteOne, find, findAll, updateOne, deleteMany } = require('../db/databaseHelper');
const { roomSchema, userSchema } = require('../schemas');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createRoom = catchAsync(async (req, res, next) => {
  const { organization_id, title, isPrivate } = req.query;
  const id = uuidv4();

  // Validate the body
  await roomSchema.validateAsync({
    id,
    organization_id,
    title,
    isPrivate,
  });

  // check if room already exists

  const alreadyExists = await find('rooms', {
    title,
  });

  const { data: itExists } = alreadyExists.data;

  if (itExists.length > 0) {
    return res.status(400).json({
      message: `Room with the title: ${title} already exists`,
    });
  }

  const room = await insertOne(
    'rooms',
    {
      id,
      organization_id,
      title,
      private: isPrivate,
    },
    organization_id
  );

  if (isPrivate) {
    return res.status(201).json({
      status: 'success',
      message: 'added private channel',
      data: {
        private: isPrivate,
        ...room.data,
      },
    });
  }
  return res.status(201).json({
    status: 'success',
    data: room.data,
  });
});

// gets all rooms for an organization
exports.getAllRooms = catchAsync(async (req, res, next) => {
  const { member_id: memberId, org_id: orgId } = req.params;

  const rooms = await find(
    'roomusers',
    {
      user_id: memberId,
    },
    orgId
  );

  if (rooms.data.data.length === 0) {
    res.status(404).json({
      status: 'failed',
      message: 'Room List is empty ',
      data: null,
    });
  }

  if (rooms.data.data.length >= 1) {
    res.status(200).json({
      status: 'success',
      message: 'Room List found',
      data: rooms.data,
    });
  } else {
    res.status(500).json({
      message: 'Server Error, Try again',
    });
  }
});

exports.joinRoom = catchAsync(async (req, res, next) => {
  // const { room_id, user_id, organization_id } = req.query;
  const { room_id: roomId, member_id: memberId, org_id: orgId } = req.params;

  // Validate the body
  await userSchema.validateAsync({
    room_id: roomId,
    user_id: memberId,
  });

  // check that the room_id is valid
  const room = await find(
    'goals',
    {
      room_id: roomId,
    },
    orgId
  );

  if (room.data.data.length <= 0) {
    return next(new AppError('Room not found', 404));
  }
  // check that user isnt already in the room
  let roomuser = await find(
    'roomusers',
    {
      room_id: roomId,
      user_id: memberId,
    },
    orgId
  );

  if (roomuser.data.data.length > 0) {
    return next(new AppError('user already in room', 400));
  }

  const getAllRooms = await findAll('goals', orgId);

  const { data: allRooms } = getAllRooms.data;

  const getRoom = allRooms.filter((el) => el.room_id === roomId);

  const data = {
    room_id: getRoom[0].room_id,
    title: getRoom[0].goal_name,
    access: getRoom[0].access,
    user_id: memberId,
  };

  roomuser = await insertOne('roomusers', data, orgId);
  const seeAll = await findAll('roomusers', orgId);

  res.status(201).json({
    status: 'success',
    data: roomuser.data,
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  // const { room_id } = req.query;
  const { room_id: roomId, org_id: orgId } = req.params;

  const room = await find(
    'goals',
    {
      id: roomId,
    },
    orgId
  );
  const { data } = room.data;
  if (data.length < 1) {
    return res.status(404).send({
      message: `room ${roomId} does not exist`,
    });
  }
  return res.status(200).json(room.data);
});

exports.removeUserFromRoom = catchAsync(async (req, res, next) => {
  // const { room_id, user_id, organization_id } = req.query;
  const { room_id: roomId, member_id: memberId, org_id: orgId } = req.params;

  await userSchema.validateAsync({
    room_id: roomId,
    user_id: memberId,
  });

  const response = await deleteMany(
    'roomusers',
    {
      room_id: roomId,
      user_id: memberId,
    },
    orgId
  );

  res.status(201).json({
    status: 'success',
    data: response.data,
  });
});

// get the number of users in a room
exports.getUsersInaRoom = catchAsync(async (req, res, next) => {
  const { room_id, user_id } = req.params;

  const foundRoom = await find('rooms', {
    id: room_id,
  });
  console.log(foundRoom.data);
  res.status(200).json(foundRoom.data);
});

exports.starRoom = async (req, res, next) => {
  const { org_id, room_id, member_id: user_id } = req.params;

  try {
    // check if the user is actually a member of the room
    const response = await find('roomusers', { room_id: org_id, user_id }, org_id);
    const room = response.data.data;

    if (!room || room.length <= 0) {
      return next(new AppError('User is not a member of room'));
    }
  } catch (error) {
    return next(new AppError('User is not a member of the room', 500));
  }

  try {
    // star the room as requsted for that user
    await updateOne('roomusers', { $set: { starred: true } }, { room_id: org_id, user_id }, org_id);

    // update the sidebar
  } catch (error) {
    return next(new AppError('Unable to star the room successfully'));
  }
};
