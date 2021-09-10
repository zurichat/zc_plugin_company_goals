/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const sidebarOptions = require('../data/sidebarPopulate');
const {findAll, find} = require('../db/databaseHelper')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync');


const readSidebar = catchAsync(async (req, res, next) => {
  if (req.query.org == sidebarOptions.organisation_id && req.query.user == sidebarOptions.user_id && req.query.token == sidebarOptions.plugin_id){
    return res.status(200).json(sidebarOptions);
  }
    return res.status(403).send({ message: 'error', data: 'bad request'});
  
});



module.exports = readSidebar;
