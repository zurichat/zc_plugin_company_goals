const axios = require("axios");
// this module is used to handle the vision
const catchAsync = require('../utils/catchAsync');

// request to get the vision
exports.getVision = catchAsync(async (req, res, next) => {
  const baseUrl = 'https://zccore.herokuapp.com';
  const pluginId = '61330fcfbfba0a42d7f38e59';
  const collectionName = 'vision';
  const organizationId = '1'; // Would be gotten from zuri main
  const url = `${baseUrl}/data/read/${pluginId}/${collectionName}/${organizationId}`;

  try {
  const result = await axios.get(url);
  await res.status(result.status).json({ status: result.status, message: result.message });
  } 
  catch (error) {
    res.status(500).json(error.message); 
  }
});

exports.createVision = (req, res)=> {
  // get the vision from client via req.body
  const { vision } = req.body;
  // insert the vision into the database
  res.send('This is a dummy response');
} 

exports.updateVision = (req, res)=> {
  // get the new vision from client via req.body
  const { vision } = req.body;
  // find and update the vision in the database with the edited vision statement
  res.send('This is a dummy response');   
} 
