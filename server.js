/* eslint-disable import/order */
/* eslint-disable import/first */
require('dotenv').config({ path: './config.env' });

const logger = require('./utils/logger');

const app = require('./app');

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled rejection at ${promise}, reason: ${reason.message}`);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM Received, Shutting down gracefully');

  server.close(() => {
    logger.info('Process Terminated because of SIGTERM');
  });
});
