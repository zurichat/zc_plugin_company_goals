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

  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      return next(new AppError('No auth token was provided.', 401));
    }

    const {
      data: { data },
    } = await axios({
      method: 'post',
      url: URL,
      headers: { Authorization: tokenHeader },
    });

    if (!data) {
      return next(new AppError('User is not authorized.', 401));
    }

    // Small hack to assign roles to users -- for testing purposes
    const date = new Date().getMinutes();
    if (date % 2 === 0) {
      data.user.role = 'admin';
    } else {
      data.user.role = 'user';
    }
    // data.user.role = 'admin';  Uncomment this line for complete admin access

    // Set user on req Object
    req.user = data.user;
    next();
  } catch (error) {
    const {
      response: {
        data: { message, status },
      },
    } = error;
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
  const { organization_id } = req.query;

  if (!organization_id) {
    return next(new AppError('organization_id is required', 400));
  }

  const tokenHeader = req.headers.authorization;

  let organization = await axios({
    method: 'get',
    url: `https://api.zuri.chat/organizations/${organization_id}`,
    headers: { Authorization: tokenHeader },
  });

  organization = organization.data.data;

  if (organization.creator_email === req.user.email) {
    req.user.role = 'owner';
    return next();
  }

  let allMembers = await axios({
    method: 'get',
    url: `https://api.zuri.chat/organizations/${organization_id}/members`,
    headers: { Authorization: tokenHeader },
  });

  allMembers = allMembers.data.data;

  const userRole = (user) => {
    if (req.user.email === user.email) {
      req.user.role = 'user';
      return next();
    }
  };
  allMembers.forEach(userRole);

  return next(new AppError('User is not a member of this organization', 403));
};

/**
 * Perform role authorization on user request.
 * @param {String} roles List of authorized roles.
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
