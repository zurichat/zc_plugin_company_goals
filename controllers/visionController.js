/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');
const { findVision, insertVision } = require('../services/vision.service');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/**
 * Get an organization's vision,
 * create an empty vision if none exists.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
const getVision = async (req, res, next) => {
  const { organization_id } = req.params;

  try {
    const data = await findVision(organization_id);

    // Check if error was returned
    if (data instanceof Error) {
      return res.status(data.statusCode).json({ status: data.statusCode, message: data.message });
    }

    res.status(200).json({ status: 200, message: 'success', payload: data });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update an organization's vision.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
const updateVision = async (req, res, next) => {
  const { organization_id } = req.params;
  const { vision } = req.body;

  try {
    const data = await insertVision(organization_id, vision);

    if (data instanceof Error) {
      return res.status(data.statusCode).json({ status: data.statusCode, message: data.message });
    }

    return res.status(200).json({ status: 200, message: 'success', payload: data });
  } catch (error) {
    return next(error);
  }
};

// Exports
exports.getVision = catchAsync(getVision);
exports.updateVision = catchAsync(updateVision);
