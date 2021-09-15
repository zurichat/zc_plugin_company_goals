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
  const URL = `https://api.zuri.chat/auth/verify-token`;

  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) return res.status(401).json('No auth token was provided.');

    const {
      data: { data },
    } = await axios.post(
      URL,
      {},
      {
        headers: {
          Authorization: tokenHeader,
        },
      }
    );

    if (!data) {
      return res.status(401).json('User is not authorized.');
    }

    // Small hack to assign roles to users -- for testing purposes
    const date = new Date().getMinutes();
    if (date % 2 === 0) {
      data.user.role = 'admin';
    } else {
      data.user.role = 'user';
    }

    // Set user on req Object
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json(error.response.data);
  }
};

exports.verifyToken = catchAsync(verifyToken);
