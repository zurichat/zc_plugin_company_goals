/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const { insertOne, deleteOne, find, findAll, updateOne, deleteMany } = require('../db/databaseHelper');
const { roomSchema, userSchema, userRoomSchema } = require('../schemas');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { publish } = require('./centrifugoController');
const updateSideBar = require('../utils/updateSidebarUnread');

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

  if (rooms.data.data === null || rooms.data.data.length === 0) {
    return res.status(404).json({
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

  membersId.forEach(async (member) => {
    let roomuser = await find(
      'roomusers',
      {
        room_id: roomId,
        member_id: member,
      },
      orgId
    );

    // check that user isnt already in the room
    if (roomuser.data.data === null || roomuser.data.data.length === 0) {
      // return next(new AppError('user already in room', 400));

      const data = {
        room_id: roomId,
        member_id: member,
      };

      roomuser = await insertOne('roomusers', data, orgId);

      // publish to the room
      const publishData = {
        room_id: roomId,
        user_id: member,
        message: `${member} has joined the room`,
      };

      await publish(`${orgId}_${member}_sidebar`, publishData);
    }
  });

  // const seeAll = await find(
  //   'roomusers',
  //   {
  //     room_id: roomId,
  //   },
  //   orgId
  // );

  res.status(201).json({
    status: 'success',
    message: 'Added users to room',
    data: membersId,
  });
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
    // publish to the room
    const publishData = {
      room_id: roomId,
      user_id: member,
      message: `${member} has left the room`,
    };

    await publish(`${orgId}_${member}_sidebar`, publishData);
  });

  // const seeAll = await find(
  //   'roomusers',
  //   {
  //     room_id: roomId,
  //   },
  //   orgId
  // );

  res.status(201).json({
    status: 'success',
    message: 'Removed users from room',
    data: membersId,
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

exports.starRoom = async (req, res, next) => {
  const { org_id, room_id, member_id } = req.params;
  let starred;
  try {
    // check if the user is actually a member of the room
    const response = await find('roomusers', { room_id: org_id, member_id }, org_id);
    const room = response.data.data;

    if (!room || room.length <= 0) {
      return next(new AppError('User is not a member of room', 400));
    }
    starred = !room[0].starred;
  } catch (error) {
    return next(new AppError('User is not a member of the room', 400));
  }

  try {
    // star the room as requsted for that user
    await updateOne('roomusers', { starred }, { room_id: org_id, member_id }, org_id);
    await updateSideBar([member_id], org_id);
    return res.status(200).json({
      status: 'success',
      message: `room ${starred ? 'starred' : 'unstarred'} successfully`,
    });

    // update the sidebar
  } catch (error) {
    return next(new AppError('Unable to star the room successfully'));
  }
};
