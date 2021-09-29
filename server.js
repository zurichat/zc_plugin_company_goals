/* eslint-disable no-console */
require('dotenv').config({
  path: './config.env'
});

const app = require('./app');
const logger = require('./utils/logger');
const Cronjob= require('./controllers/cronController');

const PORT = process.env.PORT || 4000;


Cronjob();
const server = app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

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