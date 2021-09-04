// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');

exports.deleteGoal = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Goal deleted',
  });
};
