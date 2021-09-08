const sidebarOptions = require('../data/sidebarPopulate');
const catchAsync = require('../utils/catchAsync');


const readSidebar = catchAsync(async (req, res, next) => {

  
  return res.status(200).json(sidebarOptions);
});

module.exports = readSidebar;
