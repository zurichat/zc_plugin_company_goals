/* eslint-disable camelcase */
const axios = require('axios');

// const { request, response } = require('express');
const { insertOne, findAll } = require('../db/databaseHelper');
const { visionSchema } = require('../schemas');
const catchAsync = require('../utils/catchAsync');


// request to get the vision
exports.getAllVision = catchAsync(async (req, res) => {
  const { organization_id } = req.params;
  // check if the organization has a vision statement
  let vision;
  try {
    vision = await findAll('vision', organization_id);
  } catch (error) {
    // if there is an error then collection hasnt been created yet.
    vision = { vision: '' };
    await insertOne('vision', vision, organization_id);
  }
  res.status(200).json({ status: 200, message: 'success',  ...vision.data });
});

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
    };

    const foundVision = findAll('vision', orgId);
    if(foundVision){
      return res.status(200).json({ message: 'A vision is already set. Use the get endpoint to view it.' })
    }

    const visions = await insertOne('vision', data, orgId);
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