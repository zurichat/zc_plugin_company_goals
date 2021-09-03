const axios = require('axios');

const catchAsync = require('../utils/catchAsync');

exports.getAllGoals = catchAsync(async (req, res, next) => {
  // If this promise is rejected, catchAsync would catch it
  // and send it to the globalErrorHandler
  await Promise.resolve('hi');

  res.status(200).json({ status: 'success', data: [{ foo: 'bar' }] });
});

exports.getSingleGoal = catchAsync(async (req, res, next) => {
  const goalId = req.params.id;
  const collectionName = 'goals';

  // for zuri core live API
  // const baseUrl = 'https://zccore.herokuapp.com';
  // const pluginId = '2333434324defef34';
  // const organizationId = '333feafdefwd34434';
  // const url = `${baseUrl}/data/read/${pluginId}/${collectionName}/${organizationId}`;

  // fake API
  const url = `https://test-zuri-core.herokuapp.com/crud/${collectionName}/find-one`;
  const result = await axios.get(url, { data: { filter: { _id: goalId } } });
  res.status(200).json(result.data);
});
