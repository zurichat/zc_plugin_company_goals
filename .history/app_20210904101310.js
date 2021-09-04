const path = require('path');

const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');

const globalErrorHandler = require('./controllers/errorController');

const goalRouter = require('./routes/goalRoutes');
const pluginInfoRouter = require('./routes/infoRoute');
const missionRouter = require('./routes/missionRoute.js');
const pingRouter = require('./routes/pingRoute');
const sidebarRouter = require('./routes/sidebarRoute.js');

const AppError = require('./utils/appError');
const rateLimiter = require('./utils/rateLimiter');

const app = express();

// Implement cors
app.use(cors());

app.options('*', cors());

// Add secure headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//  Reading data from the body into req.body. The limit option manages how large the data can be
app.use(express.json({ limit: '10kb' }));

// Parse cookies
app.use(cookieParser());

// Data Sanitization against XSS
app.use(xss());

// Compress text sent to client
app.use(compression());

// Api routes
app.use('/api/v1/goals', rateLimiter(), goalRouter);
app.use('/ping', rateLimiter(), pingRouter);
app.use('/sidebar', rateLimiter(), sidebarRouter);
app.use('/info', rateLimiter(), pluginInfoRouter);

// To serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// To catch all unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
