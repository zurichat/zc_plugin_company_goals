const catchAsync = require('../utils/catchAsync');

exports.getAllGoals = catchAsync(async (req, res, next) => {
  // If this promise is rejected, catchAsync would catch it
  // and send it to the globalErrorHandler
  await Promise.resolve('hi');

  res.status(200).json({ status: 'success', data: [{ foo: 'bar' }] });
});
