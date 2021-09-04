// this module is used to handle the vision

// request to get the mission
exports.getVision = (req, res) => {
  // get the vision
  // fetch(vision from database)

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
