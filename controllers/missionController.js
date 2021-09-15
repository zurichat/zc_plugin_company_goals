/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
// this module is used to handle the mission
const axios = require('axios');
const { missionSchema } = require('../schemas');
const catchAsync = require('../utils/catchAsync');
const { findAll, insertOne, updateOne } = require('../db/databaseHelper');

//Global Variables
const collectionName = "mission";

// exports.createMission = catchAsync(async (req, res, next) => {
//   // Validating each property against their data type
//   await missionSchema.validateAsync(req.body);

//   // Fake API
//   // https://api.zuri.chat/data/write

//   const goals = await axios.post(`https://zccore.herokuapp.com/data/write`, {
//     plugin_id: '61330fcfbfba0a42d7f38e59',
//     organization_id: '1',
//     collection_name: 'missions',
//     bulk_write: false,
//     payload: req.body,
//   });

//   // Sending Responses
//   res.status(200).json(goals.data);
// });

// get mission for an organization
exports.getMission = catchAsync(async (req, res, next) => {
  const { organization_id } = req.params;

  // check if the organization has a mission statement
  let mission;
  try {
    mission = await findAll('mission', organization_id);
    [mission] = mission.data.data;
  } catch (error) {
    // if there is an error then collection hasnt been created yet.
    mission = { mission: '' };
    await insertOne('mission', mission, organization_id);
  }

  res.status(200).json({ status: 200, message: 'success', data: mission });
});

exports.updateMission = catchAsync(async (req, res, next)=> {
  const mission = req.body;
  const { role } = req.user;
  const {organization_id} = req.params;

  if (role !=='admin') {
    res.status(401).json({message: "You are not authorized to perform this action"})
  }
  try {
    let prevMission = await findAll(collectionName,organization_id);
    [prevMission] = prevMission.data.data
    const updatedMission = await updateOne(collectionName, mission,{},organization_id,prevMission._id);
    return res.status(200).json({message: "Update Sucessful", update: updatedMission.data});
  }
  catch(error) {
    next(error);
  }
});
