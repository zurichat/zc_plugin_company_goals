const sidebarOptions = require('../data/sidebarPopulate');
const catchAsync = require('../utils/catchAsync');



const readSidebar = catchAsync(async (req, res, next) => {
  if (req.query.org == sidebarOptions.organisation_id && req.query.user == sidebarOptions.user_id && req.query.token == sidebarOptions.plugin_id){
    return res.status(200).json(sidebarOptions);
  }else{
    return res.status(403).send({ message: 'error', data: "bad request"});
  }
});
module.exports = readSidebar;
