/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

const { findAll, find } = require('../db/databaseHelper');
const catchAsync = require('../utils/catchAsync');

exports.readSidebar = catchAsync(async (req, res) => {
  const joined_rooms = [];
  const public_rooms = [];
  const details = [];

  const { user: user_id } = req.query;

  const findUserRooms = await find('roomusers', { user_id });

  const { data: userRooms } = findUserRooms.data;

  if (userRooms.length < 1) {
    return res.status(404).send({ message: `User ${user_id} has not joined any room` });
  }

  const userRoomIds = userRooms.map((room) => {
    return room.room_id;
  });

  const getAllrooms = await findAll('rooms');

  const { data: allRoomsArr } = getAllrooms.data;

  const findRoomUsers = await findAll('roomusers');
  const { data: roomUsersArr } = findRoomUsers.data;

  for (let i = 0; i < allRoomsArr.length; i++) {
    for (const roomId of userRoomIds) {
      if (allRoomsArr[i].id === roomId) {
        details.push(allRoomsArr[i]);
      }
    }
  }

  for (const detail of details) {
    const numOfUsers = roomUsersArr.filter((room) => room.room_id === detail.id).length;

    if (!detail.private) {
      public_rooms.push({
        title: detail.title,
        id: detail.id,
        unread: 0,
        members: numOfUsers,
        icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
        action: 'open',
      });
    }

    joined_rooms.push({
      title: detail.title,
      id: detail.id,
      unread: 0,
      members: numOfUsers,
      icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
      action: 'open',
    });
  }

  const response = {
    name: 'Company Goals Plugin',
    description: 'Shows company goals items',
    plugin_id: '61330fcfbfba0a42d7f38e59',
    organisation_id: '1',
    user_id,
    group_name: 'Goals',
    show_group: false,
    joined_rooms,
    public_rooms,
  };

  return res.status(200).json(response);
});
