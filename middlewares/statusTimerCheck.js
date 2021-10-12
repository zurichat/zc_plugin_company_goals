const logger = require('../utils/logger');

const getDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
const statusCheck = (req, res, next) => {
  res.locals.time = '';
  if (res.status(200)) {
    logger.info(`status 200: ${req.url}`);
    const start = process.hrtime();

    res.on('finish', () => {
      const durationInMilliseconds = getDurationInMilliseconds(start).toLocaleString();
      logger.info(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`);
      res.locals.time = durationInMilliseconds;
    });
    next();
    return;
  }

  if (res.status(400)) {
    logger.info(`status 400: ${req.url} had a bad request`);
    next();
    return;
  }
  if (res.status(500)) {
    logger.info(`status 500: ${req.url} had a bad server error`);
  }
};

module.exports = statusCheck;

// res.on('close', () => {
//     const durationInMilliseconds = getDurationInMilliseconds (start)
//     console.log(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`)
// })
