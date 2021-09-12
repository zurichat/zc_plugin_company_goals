<<<<<<< HEAD
=======
/* eslint-disable no-unused-vars */
const { request, response } = require('express');
>>>>>>> e7b8cc8f5d34a3b18a2a983985ff31f68e59c17a
const pluginInfo = require('../data/pluginInfo.json');

/**
 * GET info about the goals plugin.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */

const getPluginInfo = (req, res) => {
  return res.status(200).json(pluginInfo);
};
module.exports = getPluginInfo;
