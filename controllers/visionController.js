const axios = require("axios");
// this module is used to handle the vision
const catchAsync = require('../utils/catchAsync');

// request to get the vision
exports.getVision = catchAsync(async(req, res, next) => {
  const vision = await axios.get(`https://test-zuri-core.herokuapp.com/crud/vision/find`);
  
  // Sending Responses
  res.status(200).json({ status: 'success', data: { vision.body } }); 

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
