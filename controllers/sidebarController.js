/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

const { find, findAll } = require('../db/databaseHelper');
const catchAsync = require('../utils/catchAsync');

exports.readSidebar = catchAsync(async (req, res, next) => {
  const { user: user_id, org: organization_id } = req.query;

  const joined_rooms = [];
  const public_rooms = [];
  const defaultOption = {
    title: 'All goals',
    icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
    action: 'open',
  };

  if (!user_id || !organization_id)
    return res.status(400).send({ error: 'sidebar query is missing the correct parameters' });

  console.log('step one');
  // find all room users to get members
  const findRoomUsers = await findAll('roomusers', organization_id);
  const { data: roomUsersArr } = findRoomUsers.data;

  console.log('step two');
  // find rooms the user is in
  const findUserRooms = await find('roomusers', { user_id });
  console.log('step three');
  const { data: getUserRooms } = findUserRooms.data;

  if (getUserRooms.length < 1) {
    return res.status(404).send({ message: `User ${user_id} has not joined any room` });
  }

  console.log('step four');
  getUserRooms.map((room) => {
    const members = roomUsersArr.filter((el) => el.room_id === room.room_id).length;
    return joined_rooms.push({
      title: room.title,
      id: room.room_id,
      unread: 0,
      members,
      icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
      action: 'open',
    });
  });

  console.log('step five');

  const getAllRooms = await findAll('goals');

  const { data: allRooms } = getAllRooms.data;

  allRooms.map((room) => {
    const members = roomUsersArr.filter((el) => el.room_id === room.room_id).length;
    if (room.access === `zuri's workspace`) {
      public_rooms.push({
        title: room.goal_name,
        id: room.room_id,
        unread: 0,
        members,
        icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
        action: 'open',
      });
    }
    return public_rooms;
  });

  const response = {
    name: 'Company Goals Plugin',
    description: 'Shows company goals items',
    plugin_id: '61330fcfbfba0a42d7f38e59',
    organisation_id: '1',
    user_id,
    group_name: 'Goals',
    show_group: false,
    general_room: defaultOption,
    joined_rooms,
    public_rooms,
  };

  return res.status(200).json(response);
});
