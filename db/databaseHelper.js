/* eslint-disable camelcase */
const axios = require('axios');
const AppError = require('../utils/appError');
const { URL, payload } = require('../utils/config').DATABASE;
const logger = require('../utils/logger');

exports.insertOne = async (collectionName, data, organization_id) => {

  logger.info(`Insert one operation to ${collectionName} of ${organization_id} started. Writing the following ${JSON.stringify(data)}`);

  try {
    const newPayload = { ...payload };
    newPayload.collection_name = collectionName;
    newPayload.payload = data;
    newPayload.organization_id = organization_id;

    const response = await axios.post(`${URL}/write`, newPayload);
    logger.info(`The write operation was successful with the following response: ${JSON.stringify(response.data.data)}`);
    return response;
  } catch (error) {
    logger.info(`The write operation failed with the following error messages: ${error}`);
    throw new AppError(`Insert One operation failed: ${error}`, 500);
  }
};

exports.insertMany = async (collectionName, data, organization_id) => {

  logger.info(`Insert many operation to ${collectionName} of ${organization_id} started. Writing the following ${JSON.stringify(data)}`);

  try {
    payload.collection_name = collectionName;
    payload.payload = data;
    payload.bulk_write = true;
    payload.organization_id = organization_id;

    const response = await axios.post(`${URL}/write`, payload);
    logger.info(`The write operation was successful with the following response: ${JSON.stringify(response.data.data)}`);
    return response;
  } catch (error) {
    logger.info(`The write operation failed with the following error messages: ${error}`);
    throw new AppError(`Insert many operation failed: ${error}`, 500);
  }
};

exports.findAll = async (collectionName, organization_id) => {

  logger.info(`Find all operation for ${collectionName} of ${organization_id} started.`);

  try {
    const { plugin_id } = payload;

    const response = await axios.get(`${URL}/read/${plugin_id}/${collectionName}/${organization_id}`);
    logger.info(`The read operation was successful with the following response: ${JSON.stringify(response.data.data)}`);
    return response;
  } catch (error) {
    logger.info(`The read operation failed with the following error messages: ${error}`);
    throw new AppError(`find all operation failed: ${error}`, 500);
  }
};

exports.findById = async (collectionName, id, organization_id) => {

  logger.info(`Find by id operation for ${collectionName} of ${organization_id} started. The id is ${id}.`);

  try {
    const { plugin_id } = payload;

    const response = await axios.get(`${URL}/read/${plugin_id}/${collectionName}/${organization_id}?_id=${id}`);
    logger.info(`The read operation was successful with the following response: ${JSON.stringify(response.data.data)}`);
    return response;
  } catch (error) {
    logger.info(`The read operation failed with the following error messages: ${error}`);
    throw new AppError(`find by id operation failed: ${error}`, 500);
  }
};

exports.find = async (collectionName, filter, organization_id) => {

  logger.info(`Find operation for ${collectionName} of ${organization_id} started. The specified filter is ${JSON.stringify(filter)}.`);

  try {
    const { plugin_id } = payload;

    let url = `${URL}/read/${plugin_id}/${collectionName}/${organization_id}?`;

    const allKeys = Object.keys(filter);
    allKeys.forEach((key) => {
      url += `${key}=${filter[key]}&`;
    });

    url = url.substr(0, url.length - 1);

    const response = await axios.get(url);
    logger.info(`The read operation was successful with the following response: ${JSON.stringify(response.data.data)}`);
    return response;
  } catch (error) {
    logger.info(`The read operation failed with the following error messages: ${error}`);
    throw new AppError(`find by id operation failed: ${error}`, 500);
  }
};

exports.updateOne = async (collectionName, data, filter, organization_id, id = null) => {

  logger.info(`Update one operation in ${collectionName} of ${organization_id} started. The specified filter is 
  ${JSON.stringify(filter)} & would update all successful matches with the following data: ${JSON.stringify(data)}.`);

  try {
    payload.collection_name = collectionName;
    payload.payload = data;
    payload.filter = filter;
    payload.object_id = id;
    payload.organization_id = organization_id;

    const response = await axios.put(`${URL}/write`, payload);
    logger.info(`The update operation was successful with the following response: ${JSON.stringify(response.data.data)}`);
    return response;
  } catch (error) {
    logger.info(`The update operation failed with the following error messages: ${error}`);
    throw new AppError(`Update One operation failed: ${error}`, 500);
  }
};

exports.updateMany = async (collectionName, data, filter, organization_id) => {

  logger.info(`Update many operation in ${collectionName} of ${organization_id} started. The specified filter is 
  ${JSON.stringify(filter)} & would update all successful matches with the following data: ${JSON.stringify(data)}.`);

  try {
    payload.collection_name = collectionName;
    payload.payload = data;
    payload.filter = filter;
    payload.bulk_write = true;
    payload.organization_id = organization_id;

    const response = await axios.put(`${URL}/write`, payload);
    logger.info(`The update operation was successful with the following response: ${JSON.stringify(JSON.stringify(response.data.data))}`);
    return response;
  } catch (error) {
    logger.info(`The update operation failed with the following error messages: ${error}`);
    throw new AppError(`Update One operation failed: ${error}`, 500);
  }
};

exports.deleteOne = async (collectionName, organization_id, _id) => {

  logger.info(`Delete one operation in ${collectionName} of ${organization_id} started. The operation would delete the 
  document with id: ${_id}`);

  try {
    payload.collection_name = collectionName;
    payload.object_id = _id;
    payload.organization_id = organization_id;

    const response = await axios({
      method: 'post',
      url: `${URL}/delete`,
      data: payload,
    });

    logger.info(`The delete operation was successful with the following response: ${JSON.stringify(response.data.data)}`);
    return response;
  } catch (error) {
    logger.info(`The delete operation failed with the following error messages: ${error}`);
    throw new AppError(`Delete one operation failed: ${error}`, 500);
  }
};

exports.deleteMany = async (collectionName, filter, organization_id) => {
  logger.info(`Delete many operation in ${collectionName} of ${organization_id} started. The operation would delete all 
  documents that match the filter: ${JSON.stringify(filter)}`);
  try {
    
    payload.collection_name = collectionName;
    payload.filter = filter;
    payload.bulk_delete = true;
    payload.organization_id = organization_id;

    const response = await axios({
      method: 'post',
      url: `${URL}/delete`,
      data: payload,
    });

    logger.info(`The delete operation was successful with the following response: ${JSON.stringify(response.data.data)}`);
    return response;
  } catch (error) {
    logger.info(`The delete operation failed with the following error messages: ${error}`);
    throw new AppError(`Update One operation failed: ${error}`, 500);
  }
};
