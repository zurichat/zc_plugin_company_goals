/* eslint-disable camelcase */
// const axios = require('axios');

// const { request, response } = require('express');
const { insertOne, findAll } = require('../db/databaseHelper');
const { visionSchema } = require('../schemas');
// this module is used to handle the vision
const catchAsync = require('../utils/catchAsync');


// request to get the vision
exports.getAllVision = async (req, res) => {
  try {
    const result = await findAll('visions');

    // checks if a vision already exists
    if(result) res.status(200).json({ message: result.data.message, data: result.data.data });

    // Creates a vision with an empty string if none exists
    else {
      const newVision = await insertOne('visions', req.body);
      res.status(200).json({ message: newVision.data.message, data: newVision.data.data });
    }
  } catch (error) {
    res.json({error})
    res.status(500).json({error: error.details});
  }
};

// exports.getSingleVision = catchAsync(async (req, res) => {
//   const organizationId = '1'; // Would be gotten from zuri main
//   const url = `${baseUrl}/data/read/${pluginId}/${collectionName}/${organizationId}`;

//   const visionId = req.params.id;

//   try {
//     const result = await axios.get(url, { params: { _id: visionId } });

//     if (result.data.data != null) {
//       // const vision = result.data.data.find((visionObj) => visionObj.id === visionId);
//       res.status(200).json({ message: result.data.message, data: result.data.data });
//     }
//     res.status(404).json({ message: 'failed, provide a valid vision id', data: null });
//   } catch (error) {
//     res.status(500).json('Server error, try again');
//   }
// });

exports.createVision = catchAsync(async (req, res) => {
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

/**
 * Update an organization's vision.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
exports.updateVision = catchAsync(async (req, res, next) => {
  // const { organization_id } = req.params;
  const { vision } = req.body;
  const { role } = req.user;

  if (role !== 'admin') {
    res.status(401).json({ message: `User is not authorized to edit organization vision.` });
    return;
  }

  try {
    // const updatedVision = await updateOne('vision', vision, { organization_id }, organization_id);
    return res.status(200).json({ update: vision });
  } catch (error) {
    next(error);
  }
})