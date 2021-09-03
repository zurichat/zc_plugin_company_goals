const axios = require('axios');

const catchAsync = require('../utils/catchAsync');

exports.createMission = catchAsync(async(req, res, next)=>{

  await res.json({message: "Success, Mission Created", data:{
    "title": "mission title",
    "description": "mission description",
  }}) 
})