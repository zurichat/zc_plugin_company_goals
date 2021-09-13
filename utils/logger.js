/* eslint-disable no-console */
const path = require('path');
const { createLogger, format, transports } = require('winston');

const { combine, timestamp: timestampFn, printf, prettyPrint } = format;

// Format function
const myFormat = printf(({ level, message, timestamp }) => `${timestamp} - ${level}: ${message}`);

// Transport for writing error logs
const errorTransport = new transports.File({
  filename: path.join(__dirname, '../logs/errors.log'),
  level: 'error',
});

// Transport for writing info logs
const infoTransport = new transports.File({
  filename: path.join(__dirname, '../logs/info.log'),
  level: 'info',
});

// Transport for writing uncaught exception logs
const exceptionsTransport = new transports.File({
  filename: path.join(__dirname, '../logs/exceptions.log'),
  handleExceptions: true,
});

// Transport for writing unhandled rejection logs
const rejectionsTransport = new transports.File({
  filename: path.join(__dirname, '../logs/rejections.log'),
});

const logger = createLogger({
  format: combine(timestampFn(), myFormat, prettyPrint()),
});

// If we're not in production then log to the `console` with the format:
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      handleExceptions: true,
      format: combine(timestampFn(), myFormat),
    })
  );
}

if (process.env.NODE_ENV === 'production') {
  logger.add(errorTransport).add(infoTransport).add(exceptionsTransport).add(rejectionsTransport);
}

// Log any errors the logger, itself, might have, to prevent uncaught exceptions
logger.on('error', (err) => console.error(err.message));

module.exports = logger;
