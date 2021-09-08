const sidebarOptions = require('../data/sidebarPopulate');
const catchAsync = require('../utils/catchAsync');



const readSidebar = catchAsync(async (req, res, next) => {
  if (req.query.userID =='1234' && req.query.token == '61330fcfbfba0a42d7f38e59'){
    return res.status(200).json(sidebarOptions);
  }else{
    return res.status(403).send({ message: 'error', data: "bad request"});
  }
});
module.exports = readSidebar;
