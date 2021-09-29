/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
const axios = require('axios');
// eslint-disable-next-line no-unused-vars
const { request, response, NextFunction } = require('express');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/**
 * Check if user is authenticated.
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {NextFunction} next
 */
const verifyToken = async (req, res, next) => {
  const URL = `https://api.zuri.chat/auth/verify-token`;
  let tokenHeader = req.headers.authorization;
  const cooky = req.headers.cookie;
  let resHeaders;
  let bearer;

  try {
    if (tokenHeader) {
      [bearer, tokenHeader, req.organization_id] = tokenHeader.split(' ');
      tokenHeader = `${bearer} ${tokenHeader}`;
      // Set token header
      resHeaders = {
        Authorization: tokenHeader,
      };

      req.tokenHeader = tokenHeader;
    } else if (cooky) {
      // Set cookie header
      resHeaders = {
        Cookie: cooky,
      };
    } else {
      return next(new AppError('No auth token or cookie was provided.', 401));
    }

    const {
      data: { data },
    } = await axios({
      method: 'post',
      url: URL,
      headers: resHeaders,
    });

    if (!data) {
      return next(new AppError('User is not authorized.', 401));
    }

    // Set admin priviledge
    data.user.role = 'admin';

    // Set user on req Object
    req.user = data.user;
    next();
  } catch (error) {
    const {
      response: {
        data: { message, status },
      },
    } = error;
    console.log(error.response.data);
    return next(new AppError(message, status));
  }
};

/**
 * Check if user is part of this organization.
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {NextFunction} next
 * @description Will be called after verifyToken.
 */
const checkIsValidUser = async (req, res, next) => {
  const { organization_id, tokenHeader } = req;
  let matchedUser;

  if (!organization_id) {
    return next(new AppError('organization_id is required', 400));
  }
  let organization = await axios({
    method: 'get',
    url: `https://api.zuri.chat/organizations/${organization_id}`,
    headers: {
      Authorization: tokenHeader,
    },
  });

  organization = organization.data.data;

  if (organization.creator_email === req.user.email) {
    req.user.role = 'owner';
    return next();
  }

  let allMembers = await axios({
    method: 'get',
    url: `https://api.zuri.chat/organizations/${organization_id}/members`,
    headers: {
      Authorization: tokenHeader,
    },
  });

  allMembers = allMembers.data.data;

  const userRole = (user) => {
    if (req.user.email === user.email) {
      req.user.role = 'user';
      matchedUser = true;
    }
  };
  allMembers.forEach(userRole);
  if (matchedUser) return next();
  return next(new AppError('User is not a member of this organization', 403));
};

/**
 * Perform role authorization on user request.
 * @param {String[]} roles List of authorized roles.
 */
const requireRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You are not authorized to perform this action', 401));
    }

    return next();
  };
};

// Exports
exports.requireRoles = requireRoles;
exports.verifyToken = catchAsync(verifyToken);
exports.checkIsValidUser = catchAsync(checkIsValidUser);
