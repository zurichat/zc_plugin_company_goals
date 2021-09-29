/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');
const logger = require('../utils/logger.js');

/**
 * Error handler for development env.
 * @param {error} err Error object
 * @param {request} req Request object
 * @param {response} res Response object
 * @returns
 */
const sendErrorDev = (err, req, res) => {
  logger.error({
    message: `[errorController.js] (line 14) - ${err.message}`,
  });

  return res.status(err.statusCode).json({
    ...err,
    message: err.message,
  });
};

/**
 * Error handler for production env.
 * @param {error} err Error object
 * @param {request} req Request object
 * @param {response} res Response object
 * @returns
 */
const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // Programming or other unknown error: don't leak error details
    // 1) Log error
    logger.error(`[errorController.js] (line 29) - ${err.message}`);

    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // Programming or other unknown error: don't leak error details
  // 1) Log error
  logger.error(`[errorController.js] (line 40) - ${err.message}`);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);
  //
  else if (process.env.NODE_ENV === 'production') {
    const error = {
      ...err,
    };

    error.message = err.message;

    sendErrorProd(error, req, res);
  }
};
