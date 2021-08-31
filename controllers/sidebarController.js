/* eslint-disable no-console */
const sidebarOptions = require('../data/sidebarData.json');

const catchAsync = require('../utils/catchAsync');

const readSidebar = catchAsync(async (req, res) => {
  await Promise.resolve('Read sidebar');
  return res.status(200).json(sidebarOptions).end();
});

module.exports = readSidebar;
