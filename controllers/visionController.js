/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');
const { insertOne, find, updateOne } = require('../db/databaseHelper');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { publish } = require('./centrifugoController');
const { createNotification } = require('./notificationController');

const user_ids = ['6145cf0c285e4a1840207426', '6145cefc285e4a1840207423', '6145cefc285e4a1840207429'];

/**
 * Get an organization's vision,
 * create an empty vision if none exists.
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {NextFunction} next Express next function
 */
const getVision = async (req, res, next) => {
  const { organization_id } = req.params;
  let vision;

  if (!organization_id) {
    return next(new AppError('organization_id is required', 400));
  }

  try {
    const {
      data: { data },
    } = await find('vision', { organization_id }, organization_id);

    // Check for multiple vision objects
    if (Array.isArray(data)) {
      [vision] = data;
    } else {
      vision = data;
    }

    // If no vision exists -- case 1 (no error thrown)
    if (!data) {
      const payload = { vision: '', organization_id };
      await insertOne('vision', payload, organization_id);
      vision = payload;
    }
  } catch (error) {
    // If no vision exists -- case 2 (error thrown)
    const payload = { vision: '', organization_id };
    await insertOne('vision', payload, organization_id);
    vision = payload;
  }

  res.status(200).json({ status: 200, message: 'success', payload: vision });
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

  if (!organization_id) {
    return next(new AppError('organization_id is required', 400));
  }

  try {
    let payload;

    const {
      data: { data: found },
    } = await find('vision', { organization_id }, organization_id);

    // Check for multiple vision objects
    if (Array.isArray(found)) {
      [payload] = found;
    } else {
      payload = found;
    }

    // Update matched vision

    const updatedVision = await updateOne('vision', { vision }, { organization_id }, organization_id, payload._id);

    // Handle if no matches were found
    if (updatedVision.data.data.modified_documents === 0) {
      return next(new AppError('No matching documents were found', 404));
    }
    // Send notification to all users.
    if (updatedVision.data.data.modified_documents > 0) {
      await publish('goals-publish-vision-update', vision);
      await createNotification(user_ids, organization_id, '', '', 'updateVision');
    }

    return res.status(200).json({ status: 200, message: 'success', payload: vision });
  } catch (error) {
    return next(new AppError('No vision exists for this organization.', 404));
  }
};

// Exports
exports.getVision = catchAsync(getVision);
exports.updateVision = catchAsync(updateVision);
