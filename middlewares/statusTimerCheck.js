const { writeFile } = require('fs').promises;
const logger = require('../utils/logger');

const getDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
const statusCheck = async (req, res, next) => {
  if (res.status(200)) {
    const start = process.hrtime();
    logger.info(`status 200: ${req.url}`);

    res.on('finish', async () => {
      const durationInMilliseconds = getDurationInMilliseconds(start).toLocaleString();
      logger.info(`${req.method} ${req.originalUrl} [FINISHED] at ${durationInMilliseconds.toLocaleString()} ms`);
      try {
        await writeFile(
          './logs/statusCodesReport.txt',
          `${req.method} ${req.originalUrl} [FINISHED] at ${durationInMilliseconds.toLocaleString()} ms> \n`,
          { flag: 'a' }
        );
      } catch (error) {
        logger.info(error.message);
      }
      res.locals.time = durationInMilliseconds;
    });
    next();
    return;
  }

  if (res.status(400)) {
    const start = process.hrtime();
    logger.info(`status 400: ${req.url} had a bad request`);

    res.on('finish', async () => {
      const durationInMilliseconds = getDurationInMilliseconds(start).toLocaleString();
      logger.info(`${req.method} ${req.originalUrl} [FINISHED] at ${durationInMilliseconds.toLocaleString()} ms`);
      try {
        await writeFile(
          './logs/statusCodesReport.txt',
          `${req.method} ${req.originalUrl} [FINISHED] at ${durationInMilliseconds.toLocaleString()} ms> \n`,
          { flag: 'a' }
        );
      } catch (error) {
        logger.info(error.message);
      }
      res.locals.time = durationInMilliseconds;
    });
    next();
    return;
  }

  if (res.status(500)) {
    const start = process.hrtime();
    logger.info(`status 500: ${req.url} had a bad server error`);

    res.on('finish', async () => {
      const durationInMilliseconds = getDurationInMilliseconds(start).toLocaleString();
      logger.info(`${req.method} ${req.originalUrl} [FINISHED] at ${durationInMilliseconds.toLocaleString()} ms`);
      try {
        await writeFile(
          './logs/statusCodesReport.txt',
          `${req.method} ${req.originalUrl} [FINISHED] at ${durationInMilliseconds.toLocaleString()} ms> \n`,
          { flag: 'a' }
        );
      } catch (error) {
        logger.info(error.message);
      }
      res.locals.time = durationInMilliseconds;
    });
    next();
  }
};

module.exports = statusCheck;

// res.on('close', () => {
//     const durationInMilliseconds = getDurationInMilliseconds (start)
//     console.log(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`)
// })
