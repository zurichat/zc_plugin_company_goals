const axios = require('axios');

const catchAsync = require('../utils/catchAsync');

exports.getAllGoals = catchAsync(async (req, res, next) => {
  // If this promise is rejected, catchAsync would catch it
  // and send it to the globalErrorHandler
  await Promise.resolve('hi');

  res.status(200).json({ status: 'success', data: [{ foo: 'hy' }] });
});

exports.updateGoalByID = catchAsync(async (req, res, next) => {
  // Get updated info from req.body
  // const { update, $set, name } = { ...req.body } ;
  // const data = { update: {
  //   $set: {
  //     name
  //   }
  // }}
  const goalId = req.params.id;
  const collectionName = 'goals';

  // send the updated goal info to zuri core
  const url = `https://test-zuri-core.herokuapp.com/crud/${collectionName}/update-by-id/${goalId}`;
  const updatedGoal = await axios.patch(url, { ...req.body });

  // send the updated goal to client.
  return res.status(200).json(updatedGoal.data);
});
