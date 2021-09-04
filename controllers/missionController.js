
const axios = require('axios');

const catchAsync = require('../utils/catchAsync');

exports.createMission = catchAsync(async(req, res, next)=>{

  await res.json({message: "Success, Mission Created", data:{
    "title": "mission title",
    "description": "mission description",
  }}) 
})

// this module is used to handle the mission

// request to get the mission
const getMission = (req, res) => {
  // get the mission
  // fetch(mission from database)

  // send the mission
  res.send('This is a dummy mission');
};

module.exports = getMission;

