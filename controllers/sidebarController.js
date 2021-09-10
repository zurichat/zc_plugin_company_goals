/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

const { findAll, find } = require('../db/databaseHelper');
const catchAsync = require('../utils/catchAsync');

exports.readSidebar = catchAsync(async (req, res) => {
  const joined_rooms = [];
  const details = [];

  const { user: user_id, org:organization_id} = req.query;

  const findUserRooms = await find('roomusers', { user_id },organization_id);

  const { data: userRooms } = findUserRooms.data;

  // if user does not have a room, return an error.


  if (userRooms.length < 1) {
    return res.status(404).send({ message: `User ${user_id} has not joined any room` });
  }

  // collate all ids of rooms the user has joined

  const userRoomIds = userRooms.map((room) => {
    return room.room_id;
  });

  // get all the rooms in the goals plugin

  const getAllrooms = await find('rooms',{organization_id},organization_id);

  const { data: allRoomsArr } = getAllrooms.data;

  // get all the room users in the goals plugin
  const findRoomUsers = await findAll('roomusers',organization_id);
  const { data: roomUsersArr } = findRoomUsers.data;

  // run a loop to find and populate the details of the room ids the user entered into
  for (let i = 0; i < allRoomsArr.length; i++) {
    for (const roomId of userRoomIds) {
      if (allRoomsArr[i].id === roomId) {
        details.push(allRoomsArr[i]);
      }
    }
  }

  // filter the room ids the user entered into and check the number of users attached to the
  // room id. Also loop through each user's room details to get the room title, id etc
  for (const detail of details) {
    const numOfUsers = roomUsersArr.filter((room) => room.room_id === detail.id).length;
    joined_rooms.push({
      title: detail.title,
      id: detail.id,
      unread: 0,
      members: numOfUsers,
      icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
      action: 'open',
    });
  }

  // set up the response object

  const response = {
    name: 'Company Goals Plugin',
    description: 'Shows company goals items',
    plugin_id: '61330fcfbfba0a42d7f38e59',
    organisation_id: organization_id,
    user_id,
    group_name: 'Goals',
    show_group: false,
    joined_rooms,
  };

  // return the response.
  return res.status(200).json(response);
});
