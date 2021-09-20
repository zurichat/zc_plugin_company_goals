/* eslint-disable import/order */
const path = require('path');

const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
//const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');

dotenv.config();

const globalErrorHandler = require('./controllers/errorController');

// Require Routes
const goalRouter = require('./routes/goalRoutes');
const pluginInfoRouter = require('./routes/infoRoute');
const missionRouter = require('./routes/missionRoute.js');
const pingRouter = require('./routes/pingRoute');
const sidebarRouter = require('./routes/sidebarRoute.js');
const roomRouter = require('./routes/roomRoute');
const userRouter = require('./routes/userRoute');
const notificationRouter = require('./routes/notificationRoute');
const authRouter = require('./routes/auth');

const visionRouter = require('./routes/visionRoutes');
const realTimeupdateRouter = require('./routes/realTimeupdates');
const AppError = require('./utils/appError');
const rateLimiter = require('./utils/rateLimiter');

const app = express();

// Implement cors
app.use(cors({ origin: ['*'] }));
// const corsoption = {
//   origin: function (origin, callback) {
// 		if (
// 			!origin ||
// 			origin === 'null' ||
// 			origin.includes('zuri.chat') ||
// 			origin.includes('localhost')
// 		) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error('not allowed by CORS'));
// 		}
// 	},
// 	credentials: true,
// }
// app.use(cors(corsoption));

//app.options('*', cors());

// Add secure headers
//app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//  Reading data from the body into req.body. The limit option manages how large the data can be
app.use(
  express.json({
    limit: '10kb',
  })
);

// Parse cookies
app.use(cookieParser());

// Data Sanitization against XSS
app.use(xss());

// Compress text sent to client
app.use(compression());

// swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerJSDocument = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Company Goals Plugin API',
      version: '1.0.0',
      description: 'Company Goals plugin api for zuri chat application documentation',
      servers: ['https://goals.zuri.chat/api'],
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJSDocument(swaggerOptions);

// To serve frontend build files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));
  app.use(express.static(path.join(__dirname, 'serve-client/dist')));
}

app.get('/zuri-plugin-company-goals.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/zuri-plugin-company-goals.js'));
});
// Api routes
app.use('/api/v1/goals', goalRouter);
app.use('/api/v1/rooms', rateLimiter(), roomRouter);
app.use('/api/v1/users', rateLimiter(), userRouter);
app.use('/ping', rateLimiter(), pingRouter);
app.use('/api/v1/sidebar', rateLimiter(), sidebarRouter);
app.use('/info', rateLimiter(), pluginInfoRouter);
app.use('/api/v1/vision', visionRouter);
app.use('/api/v1/mission', missionRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/realTimeupdates', realTimeupdateRouter);
app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1/auth', authRouter);

// Send all 404 requests not handled by the server to the Client app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'serve-client/dist', 'index.html'));
});

// To catch all unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
