const axios = require('axios');
// eslint-disable-next-line no-unused-vars
const { request, response, NextFunction } = require('express');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/**
 * Check if user is authenticated.
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {NextFunction} next
 */
const verifyToken = async (req, res, next) => {
  const URL = `https://api.zuri.chat/auth/verify-token`;

  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) return res.status(401).json('No auth token was provided.');

    const {
      data: { data },
    } = await axios.post(
      URL,
      {},
      {
        headers: {
          Authorization: tokenHeader,
        },
      }
    );

    if (!data) {
      return res.status(401).json('User is not authorized.');
    }

    // Small hack to assign roles to users -- for testing purposes
    const date = new Date().getMinutes();
    if (date % 2 === 0) {
      data.user.role = 'admin';
    } else {
      data.user.role = 'user';
    }

    // Set user on req Object
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json(error.response.data);
  }
};

exports.verifyToken = catchAsync(verifyToken);


// check if user is part of this organization
//will be called after the above
exports.checkIsValidUser =  catchAsync(async(req,res,next)=>{
  const {organization_id} = req.query

  if(!organization_id)
  {
    return next(new AppError('organization_id is required',400))
  }
  const tokenHeader = req.headers.authorization

  let organization = await axios.get(
    `https://api.zuri.chat/organizations/${organization_id}`,
    {},
    {
      headers: {
        Authorization: tokenHeader,
      },
    }
  )

  organization = organization.data.data

  if(organization.creator_email===req.user.email)
  {
    req.user.role = 'owner'
    next()
  }


  let  allMembers = await axios.get(
    `https://api.zuri.chat/organizations/${organization_id}/members`,
    {},
    {
      headers: {
        Authorization: tokenHeader,
      },
    }
  )

  allMembers = allMembers.data.data

  for(let user of allMembers)
  {
    if(req.user._id===user._id)

    {
      req.user.role = 'user'
      return next()
    }
  }
  return next(new AppError('User is not a member of this organization',400))
}) 
