/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const { insertOne, deleteOne, find, findAll, updateOne, deleteMany } = require('../db/databaseHelper');
const { roomSchema, userSchema, userRoomSchema } = require('../schemas');
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
      member_id: memberId,
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
  const { member_id: memberId, org_id: orgId } = req.params;
  const { room_id: roomId, members_id: membersId } = req.body;

  // Validate the body
  await userRoomSchema.validateAsync({
    room_id: roomId,
    members_id: membersId,
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

  const { goalName, access } = room.data;

  membersId.forEach(async (member) => {
    let roomuser = await find(
      'roomusers',
      {
        room_id: roomId,
        member_id: member,
      },
      orgId
    );

    if (roomuser.data.data.length < 1) {
      // return next(new AppError('user already in room', 400));

      const data = {
        room_id: roomId,
        title: goalName,
        access,
        member_id: member,
      };

      roomuser = await insertOne('roomusers', data, orgId);
    }
  });

  const seeAll = await find(
    'roomusers',
    {
      room_id: roomId,
    },
    orgId
  );

  res.status(201).json({
    status: 'success',
    data: seeAll.data,
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
  const { member_id: memberId, org_id: orgId } = req.params;
  const { room_id: roomId, members_id: membersId } = req.body;

  // Validate the body
  await userRoomSchema.validateAsync({
    room_id: roomId,
    members_id: membersId,
  });

  membersId.forEach(async (member) => {
    const response = await deleteMany(
      'roomusers',
      {
        room_id: roomId,
        member_id: member,
      },
      orgId
    );
  });

  const seeAll = await find(
    'roomusers',
    {
      room_id: roomId,
    },
    orgId
  );

  res.status(201).json({
    status: 'success',
    data: seeAll.data,
  });
});

// get the number of users in a room
exports.getUsersInaRoom = catchAsync(async (req, res, next) => {
  const { room_id: roomId, org_id: orgId } = req.params;
  if (!orgId) return next(new AppError('Org id is required', 400));
  if (!roomId) return next(new AppError('Room id is required', 400));

  const foundRoom = await find(
    'roomusers',
    {
      room_id: roomId,
    },
    orgId
  );

  res.status(200).json(foundRoom.data);
});

exports.starRoom = async (req, res, next) => {
  const { org_id, room_id, member_id } = req.params;

  // check if there is already an entry for the user and org
  try {
    const response = await find('goals', { org_id, member_id }, '1');
    const starred = response.data.data;
    if (starred.length > 0) {
      return res.json({
        status: 'success',
        message: 'starred successfully',
      });
    }
  } catch (error) {
    return next(new AppError('unable to star room', 500));
  }
};
