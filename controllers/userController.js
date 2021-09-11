/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');
const { find } = require('../db/databaseHelper');
const catchAsync = require('../utils/catchAsync');

/**
 * Get all rooms a user is connected to.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
const getUserRooms = async (req, res) => {
  const userRoomsDetails = [];
  const { user_id, organization_id } = req;

  // Get all rooms in the organization
  const {
    data: { data: orgRooms },
  } = await find('rooms', { organization_id }, organization_id);

  // Get all rooms a user is connected to
  const {
    data: { data: userRooms },
  } = await find('roomusers', { user_id }, organization_id);

  if (userRooms.length < 1) {
    return res.status(200).json({ message: 'User is not connected to any rooms.' });
  }

  // Grab room ids of connected rooms
  const userRoomIDS = userRooms.map((obj) => obj.room_id);

  // Collect connected rooms details into array
  userRoomIDS.forEach((id) => {
    const index = orgRooms.find((room) => room.id === id);
    userRoomsDetails.push(orgRooms[index]);
  });

  res.status(200).json({ rooms: userRoomsDetails });
};

// Exports
exports.getUserRooms = catchAsync(getUserRooms);
