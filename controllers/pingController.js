/* eslint-disable no-unused-vars */
exports.ping = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is up and running right now....',
  });
};