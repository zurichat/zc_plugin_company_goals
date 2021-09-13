/* eslint-disable camelcase */
const axios = require('axios');
// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');
// const { updateOne } = require('../db/databaseHelper');
const { visionSchema } = require('../schemas');
const catchAsync = require('../utils/catchAsync');

// Global variables
const collectionName = 'vision';
const pluginId = '61330fcfbfba0a42d7f38e59';
const baseUrl = 'https://zccore.herokuapp.com';

// request to get the vision
exports.getAllVision = async (req, res) => {
  const organizationId = '1'; // Would be gotten from zuri main
  const url = `${baseUrl}/data/read/${pluginId}/${collectionName}/${organizationId}`;

  try {
    const result = await axios.get(url);
    res.status(result.data.status).json({ message: result.data.message, data: result.data.data });
  } catch (error) {
    res.status(500).json('Server Error, Try again');
  }
};

exports.getSingleVision = catchAsync(async (req, res) => {
  const organizationId = '1'; // Would be gotten from zuri main
  const url = `${baseUrl}/data/read/${pluginId}/${collectionName}/${organizationId}`;

  const visionId = req.params.id;

  try {
    const result = await axios.get(url, { params: { _id: visionId } });

    if (result.data.data != null) {
      // const vision = result.data.data.find((visionObj) => visionObj.id === visionId);
      res.status(result.data.status).json({ message: result.data.message, data: result.data.data });
    }
    res.status(404).json({ message: 'failed, provide a valid vision id', data: null });
  } catch (error) {
    res.status(500).json('Server error, try again');
  }
});

exports.createVision = catchAsync(async (req, res) => {
  // Validate data type from req.body is consistent with schema
  await visionSchema.validateAsync(req.body);

  const vision = await axios.post(`https://zccore.herokuapp.com/data/write`, {
    plugin_id: pluginId,
    organization_id: '1',
    collection_name: collectionName,
    bulk_write: false,
    payload: req.body,
  });

  // Sending Responses
  res.status(200).json(vision.data);
});

/**
 * Update an organization's vision.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
const updateVision = async (req, res, next) => {
  // const { organization_id } = req.params;
  const { vision } = req.body;
  const { role } = req.user;

  if (role !== 'admin') {
    res.status(401).json({ message: `User is not authorized to edit organization vision.` });
    return;
  }

  try {
    // const updatedVision = await updateOne('vision', vision, { organization_id }, organization_id);
    return res.status(200).json({ update: vision });
  } catch (error) {
    next(error);
  }
};

exports.updateVision = catchAsync(updateVision);
