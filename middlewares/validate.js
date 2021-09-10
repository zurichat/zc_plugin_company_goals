const axios = require('axios');
// eslint-disable-next-line no-unused-vars
const { request, response, NextFunction } = require('express');
const catchAsync = require('../utils/catchAsync');

/**
 * Check if user is authenticated.
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {NextFunction} next
 */
const verifyToken = async (req, res, next) => {
  /**
   * TODO:
   * Refactor URL to zuri-core's URL
   * Refactor authorization property on cookie object to SID
   */
  const token = req.cookies.authorization;
  const URL = `https://test-zuri-core.herokuapp.com/auth/verify/${token}`;

  const data = await axios.get(URL);

  if (!data.user) {
    return res.status(403).json('User is not authorized');
  }

  next();
};

exports.verifyToken = catchAsync(verifyToken);
