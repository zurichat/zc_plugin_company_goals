// this module is used to handle the mission
const axios = require('axios');
const Joi = require('joi');

const catchAsync = require('../utils/catchAsync');

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

exports.createMission = catchAsync(async (req, res, next) => {
  // Validating each property against their data type
  await schema.validateAsync(req.body);

  // Fake API
  // https://api.zuri.chat/data/write

  const goals = await axios.post(`https://zccore.herokuapp.com/data/write`, {
    plugin_id: '61330fcfbfba0a42d7f38e59',
    organization_id: '1',
    collection_name: 'missions',
    bulk_write: false,
    payload: req.body,
  });

  // Sending Responses
  res.status(200).json(goals.data);
});

exports.getSingleMission = catchAsync(async (req, res, next) => {
  const missionId = req.params.id;
  const collectionName = 'missions';

  // for zuri core live API
  const baseUrl = 'https://zccore.herokuapp.com';
  const pluginId = '61330fcfbfba0a42d7f38e59';
  const organizationId = '1'; // Would be gotten from zuri main
  const url = `${baseUrl}/data/read/${pluginId}/${collectionName}/${organizationId}`;

  const result = await axios.get(url, { params: { _id: missionId } });
  const status = result.status || 200;
  const data = result.data.data[0];
  res.status(status).json({ status: status, message: 'success', data: data });
});
