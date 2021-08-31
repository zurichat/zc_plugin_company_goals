// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');

const pluginInfo = require('../data/pluginInfo.json');

/**
 * GET info about the goals plugin.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */

const getPluginInfo = (req, res) => {
  res.status(200).json(pluginInfo);
};
module.exports = getPluginInfo;
