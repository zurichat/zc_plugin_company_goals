// const axios = require('axios');
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

    const token = req.cookies.authorization;
    const URL = `https://test-zuri-core.herokuapp.com/auth/verify/${token}`;

    try {
      const {
        data: { data },
      } = await axios.post(URL);

      if (!data) {
        return res.status(403).json('User is not authorized.');
      }

      next();
    } catch (error) {
      return res.status(403).json(error.response.data);
    }
   */

  /**
   * For testing purposes, since we can't simulate the login flow.
   *
   * Usage:
   *
   * - Attach middleware to routes that require protection.
   * - Use a 'token' query param to set priviledges
   * -- e.g localhost:4000/info/?token=admin, localhost:4000/info/?token=daddyshowkey
   *
   * - Omit query param or use 'err' in query param to simulate invalid token.
   * -- e.g localhost:4000/info/?token=err, localhost:4000/info
   *
   * priviledges:
   * - admin
   * - intern
   */
  const { token } = req.query;
  let role = 'intern';

  if (!token || token.search(/err/i) >= 0) return res.status(401).json({ message: 'User is not authorized.' });

  if (token.search(/admin/i) >= 0) {
    role = 'admin';
  }

  const user = {
    _id: '612e4a8f020e672b5e5a274e',
    name: 'Aalegra',
    email: 'celeste@goals.com',
    password: 'lanadelray',
    role: `${role}`,
  };

  req.user = user;
  next();
};

exports.verifyToken = catchAsync(verifyToken);
