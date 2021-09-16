/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');
const { insertOne, find, updateOne } = require('../db/databaseHelper');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

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

    // If no vision exists
    if (!data) {
      vision = { vision: '', organization_id };
      await insertOne('vision', vision, organization_id);
    }
  } catch (error) {
    next(new AppError('Something unexpected occured.', 500));
  }

  res.status(200).json({ status: 200, message: 'success', payload: vision });
};

/*
const createVision = async (req, res, next) => {
  try {
    // Validate data type from req.body is consistent with schema

    const { organization_id: orgId } = req.query;
    const {vision} = req.body;

    if (!orgId) {
      res.status(400).send({ error: 'Organization_id is required' });
    }

    const data = {
      ...vision,
    };

    const foundVision = findAll('vision', orgId);
    if (foundVision) {
      return res.status(200).json({ message: 'A vision is already set. Use the get endpoint to view it.' });
    }

    const visions = await insertOne('vision', data, orgId);
    // Sending Responses
    res.status(200).json({ message: 'success', ...visions.data, data });
  } catch (err) {
    if (err) {
      return res.status(400).json({ error: err.details });
    }
  }
};
*/

/**
 * Update an organization's vision.
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {NextFunction} next Express next function
 */
const updateVision = async (req, res, next) => {
  const { organization_id } = req.params;
  const { vision } = req.body;
  const { role } = req.user;

  if (role !== 'admin') {
    res.status(401).json({ status: 401, message: `User is not authorized to edit organization vision.` });
    return;
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
    const {
      data: { data: match },
    } = await updateOne('vision', { vision }, { organization_id }, organization_id, payload._id);

    // Handle if no matches were found
    if (match.matched_documents === 0) {
      next(new AppError('No matching documents were found', 404));
    }

    return res.status(200).json({ status: 200, message: 'success', payload });
  } catch (error) {
    next(new AppError('Something unexpected occured.', 500));
  }
};

// Exports
exports.getVision = catchAsync(getVision);
exports.updateVision = catchAsync(updateVision);
