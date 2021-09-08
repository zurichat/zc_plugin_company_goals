const {URL,payload} = require('../utils/config').DATABASE
const axios = require('axios')
const AppError = require('../utils/appError')


exports.insertOne = async(collectionName,data)=>{
    try {
        const newPayload = {...payload}
        newPayload.collection_name = collectionName
        newPayload.payload = data

        const response = await axios.post(`${URL}/write`,newPayload)
        return response

    } catch (error) {
        throw new AppError(`Insert One operation failed: ${error}`,500)
    }
} 

exports.insertMany = async(collectionName,data)=>{
    try {
        payload.collection_name = collectionName
        payload.payload = data
        payload.bulk_write = true

        const response = await axios.post(`${URL}/write`,payload)
        return response

    } catch (error) {
        throw new AppError(`Insert One operation failed: ${error}`,500)
    }
} 



exports.findAll = async(collectionName)=>
{
    try {
        const {plugin_id,organization_id} = payload 

        const response = await axios.get(`${URL}/read/${plugin_id}/${collectionName}/${organization_id}`)
        return response

    } catch (error) {
        throw new AppError(`find all operation failed: ${error}`,500)
    }
}


exports.findById = async(collectionName,id)=>{
    try {
        const {plugin_id,organization_id} = payload 

        const response = await axios.get(`${URL}/read/${plugin_id}/${collectionName}/${organization_id}?_id=${id}`)
        return response

    } catch (error) {
        throw new AppError(`find by id operation failed: ${error}`,500)
    }   
}


exports.updateOne = async(collectionName,data)=>{
    try {
        const newPayload = {...payload}
        newPayload.collection_name = collectionName
        newPayload.payload = data

        const response = await axios.post(`${URL}/write`,newPayload)
        return response

    } catch (error) {
        throw new AppError(`Insert One operation failed: ${error}`,500)
    }
} 
