/* eslint-disable camelcase */
const axios = require('axios');
const AppError = require('../utils/appError');
const { URL, payload } = require('../utils/config').DATABASE;

exports.insertOne = async (collectionName, data, organization_id='1') => {
  try {
    const newPayload = { ...payload };
    newPayload.collection_name = collectionName;
    newPayload.payload = data;
    newPayload.organization_id = organization_id

    const response = await axios.post(`${URL}/write`, newPayload);
    return response;
  } catch (error) {
    console.log(error.response.data)
    throw new AppError(`Insert One operation failed: ${error}`, 500);
  }
};

exports.insertMany = async (collectionName, data, organization_id='1') => {
  try {
    payload.collection_name = collectionName;
    payload.payload = data;
    payload.bulk_write = true;
    payload.organization_id = organization_id

    const response = await axios.post(`${URL}/write`, payload);
    return response;
  } catch (error) {
    throw new AppError(`Insert One operation failed: ${error}`, 500);
  }
};

exports.findAll = async (collectionName, organization_id='1') => {
  try {
    const { plugin_id } = payload;

    const response = await axios.get(`${URL}/read/${plugin_id}/${collectionName}/${organization_id}`);
    return response;
  } catch (error) {
    throw new AppError(`find all operation failed: ${error}`, 500);
  }
};

exports.findById = async (collectionName, id, organization_id='1') => {
  try {

    const { plugin_id } = payload;

  
    const response = await axios.get(`${URL}/read/${plugin_id}/${collectionName}/${organization_id}?_id=${id}`);
    return response;
  } catch (error) {
    throw new AppError(`find by id operation failed: ${error}`, 500);
  }
};

exports.find = async (collectionName, filter, organization_id='1') =>{
  try {
    const { plugin_id } = payload;

    

    let url = `${URL}/read/${plugin_id}/${collectionName}/${organization_id}?`

    const allKeys = Object.keys(filter)
    allKeys.forEach((key)=>{
      url+=`${key}=${filter[key]}&`
    })

    url = url.substr(0,url.length-1)

    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new AppError(`find by id operation failed: ${error}`, 500);
  }
}

exports.updateOne = async (collectionName, data, filter, organization_id='1', id=null) => {
  try {

    payload.collection_name = collectionName;
    payload.payload = data;
    payload.filter = filter
    payload.object_id = id
    payload.organization_id = organization_id

    const response = await axios.put(`${URL}/write`, payload);
    return response;
  } catch (error) {
    throw new AppError(`Update One operation failed: ${error}`, 500);
  }
};


exports.updateMany = async (collectionName, data, filter, organization_id='1') => {
    try {
  
      payload.collection_name = collectionName;
      payload.payload = data;
      payload.filter = filter
      payload.bulk_write = true
      payload.organization_id = organization_id

      const response = await axios.put(`${URL}/write`, payload);
      return response;
    } catch (error) {
      throw new AppError(`Update One operation failed: ${error}`, 500);
    }
};


exports.deleteOne = async(collectionName, filter, organization_id='1',id=null)=>{
  try {

    payload.collection_name = collectionName;
    payload.filter = filter
    payload.object_id = id
    payload.organization_id = organization_id

    const response = await axios({
      method: 'delete',
      url: `${URL}/write`,
      data: payload
    });
    return response;
  } catch (error) {
    throw new AppError(`Update One operation failed: ${error}`, 500);
  }
}

exports.deleteMany = async(collectionName, filter, organization_id='1')=>{
  try {
  
    payload.collection_name = collectionName;
    payload.filter = filter
    payload.bulk_write = true
    payload.organization_id = organization_id

    const response = await axios({
      method: 'delete',
      url: `${URL}/write`,
      data: payload
    });

    return response;
  } catch (error) {
    throw new AppError(`Update One operation failed: ${error}`, 500);
  }
}

