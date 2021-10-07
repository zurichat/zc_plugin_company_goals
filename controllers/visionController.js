/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');
const { findVision, insertVision } = require('../services/vision');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/**
 * Get an organization's vision,
 * create an empty vision if none exists.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
const getVision = async (req, res) => {
  const { organization_id } = req.params;

  const data = await findVision(organization_id);

  // Check if error was returned
  if (data instanceof Error) {
    return res.status(data.statusCode).json({ status: data.statusCode, message: data.message });
  }

  res.status(200).json({ status: 200, message: 'success', payload: data });
};

/**
 * Update an organization's vision.
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {NextFunction} next Express next function
 */
const updateVision = async (req, res, next) => {
  const { organization_id } = req.params;
  const { vision } = req.body;

  const data = await insertVision(organization_id, vision);

  if (data instanceof Error) {
    return next(data);
  }

  return res.status(200).json({ status: 200, message: 'success', payload: data });
};

// Exports
exports.getVision = catchAsync(getVision);
exports.updateVision = catchAsync(updateVision);
