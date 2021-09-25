/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
// this module is used to handle the mission
const axios = require('axios');
const { findAll, insertOne, updateOne, find } = require('../db/databaseHelper');
const { missionSchema } = require('../schemas');
const catchAsync = require('../utils/catchAsync');
const { publish } = require('./centrifugoController');
const { createNotification } = require('./notificationController');

// Global Variables
const collectionName = 'mission';

const user_ids = ['6145cf0c285e4a1840207426', '6145cefc285e4a1840207423', '6145cefc285e4a1840207429'];

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
    mission = {
      mission: '',
    };
    await insertOne('mission', mission, organization_id);
  }

  res.status(200).json({
    status: 200,
    message: 'success',
    data: mission,
  });
});

exports.updateMission = catchAsync(async (req, res, next) => {
  const mission = req.body;
  const { organization_id } = req.params;

  // if (role !=='admin') {
  //   res.status(401).json({message: 'You are not authorized to perform this action'})
  // }
  try {
    let prevMission = await findAll(collectionName, organization_id);
    [prevMission] = prevMission.data.data;
    const updatedMission = await updateOne(collectionName, mission, {}, organization_id, prevMission._id);

    // Send notifications to all users.
    if (updatedMission.data.data.modified_documents === 1) {
      await publish('publish-mission-update', mission.mission);
      await createNotification(user_ids, organization_id, '', '', 'updateMission');
    }

    return res.status(200).json({
      message: 'Update Sucessful',
      update: updatedMission.data,
    });
  } catch (error) {
    next(error);
  }
});
