/* eslint-disable no-console */
require('dotenv').config({
  path: './config.env',
});

const app = require('./app');
const Cronjob = require('./controllers/cronController');
const { sync } = require('./controllers/syncController');
const logger = require('./utils/logger.js');

const PORT = process.env.PORT || 4000;

Cronjob();
// SyncJob();
const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  sync(); // run the synchronization queue when the server starts up
});

// process.on('unhandledRejection', (reason, promise) => {
//   logger.error(`Unhandled rejection at ${promise}, reason: ${reason.message}`);

//   server.close(() => {
//     process.exit(1);
//   });
// });

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM Received, Shutting down gracefully');

//   server.close(() => {
//     logger.info('Process Terminated because of SIGTERM');
//   });
// });
