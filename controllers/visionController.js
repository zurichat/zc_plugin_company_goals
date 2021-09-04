const axios = require("axios");
// this module is used to handle the vision

const collectionName = "vision"; 
// request to get the vision
exports.getVision = async(req, res) => {
  const url = `https://test-zuri-core.herokuapp.com/crud/${collectionName}/`
  // fetch(vision from database)
  const vision = await axios.get(url);
  // Sending Responses
  res.status(200).json({ status: 'success', data: { vision.data.body } }); 
  

  // send the mission
  res.send('This is a dummy vision');
};

exports.addVision = (req, res)=> {
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
