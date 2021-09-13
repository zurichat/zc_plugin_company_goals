/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
const axios = require('axios');
const { visionSchema } = require('../schemas');
const { insertOne, find, findAll } = require('../db/databaseHelper');
// this module is used to handle the vision
const catchAsync = require('../utils/catchAsync');

// request to get the vision
exports.getAllVision = async (req, res, next) => {
  try {
    const result = await findAll('visions');
    res.status(200).json({ message: result.data.message, data: result.data.data });
  } catch (error) {
    res.json({error})
    res.status(500).json({error: error.details});
  }
};

exports.getSingleVision = catchAsync(async (req, res, next) => {
  const organizationId = '1'; // Would be gotten from zuri main
  const url = `${baseUrl}/data/read/${pluginId}/${collectionName}/${organizationId}`;

  const visionId = req.params.id;

  try {
    const result = await axios.get(url, { params: { _id: visionId } });

    if (result.data.data != null) {
      // const vision = result.data.data.find((visionObj) => visionObj.id === visionId);
      res.status(200).json({ message: result.data.message, data: result.data.data });
    }
    res.status(404).json({ message: 'failed, provide a valid vision id', data: null });
  } catch (error) {
    res.status(500).json('Server error, try again');
  }
});

exports.createVision = catchAsync(async (req, res, next) => {
  try{
    // Validate data type from req.body is consistent with schema
   
    const { organization_id: orgId } = req.query;
    const vision = req.body;
    
    if (!orgId) {
      res.status(400).send({ error: 'Organization_id is required' });
    }

    await visionSchema.validateAsync(req.body);
    const data = {
      ...vision
    }

    const visions = await insertOne('visions', data);
    // Sending Responses
    res.status(200).json({ message: 'success', ...visions.data, data });

  }

  catch(err){
    if (err) {
      return res.status(400).json({error: err.details });
    } 
  }

  
});

exports.updateVision = (req, res) => {
  // get the new vision from client via req.body
  // const { vision } = req.body;
  // find and update the vision in the database with the edited vision statement
  res.send('Dummy response');
};
