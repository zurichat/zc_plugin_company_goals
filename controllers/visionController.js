const axios = require('axios');
const Joi = require('joi');

// this module is used to handle the vision
const catchAsync = require('../utils/catchAsync');

// Global variables
const collectionName = 'vision';
const pluginId = '61330fcfbfba0a42d7f38e59';
const baseUrl = 'https://zccore.herokuapp.com';

// Schema
const schema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

// request to get the vision
exports.getAllVision = async (req, res, next) => {
  const organizationId = '1'; // Would be gotten from zuri main
  const url = `${baseUrl}/data/read/${pluginId}/${collectionName}/${organizationId}`;

  try {
    const result = await axios.get(url);
    res.status(result.data.status).json({ message: result.data.message, data: result.data.data });
  } catch (error) {
    res.status(500).json('Server Error, Try again');
  }
};

exports.getSingleVision = catchAsync(async (req, res, next) => {
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

exports.createVision = catchAsync(async (req, res, next) => {
  // Validate data type from req.body is consistent with schema
  await schema.validateAsync(req.body);

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

exports.updateVision = (req, res) => {
  // get the new vision from client via req.body
  // const { vision } = req.body;
  // find and update the vision in the database with the edited vision statement
  res.send('Dummy response');
};
