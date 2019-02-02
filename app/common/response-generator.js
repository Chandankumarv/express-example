`use strict`
const PropertiesReader = require('properties-reader');
const path = require('path')
const responseMessages = PropertiesReader(path.join(__dirname,'../config/response-message.properties'));
const errorMessages = PropertiesReader(path.join(__dirname,'../config/error-message.properties'));

/**
 * Generates success response
 * @param {object} data
 * @param {string} msgKey
 */
module.exports.generateSuccessResponse = function(data, msgKey){
  return {
    data: data,
    message: responseMessages.get(msgKey),
    timestamp : new Date()
  }
}

/**
 * Generates error response
 * @param {string} msg
 * @param {error} debug
 */
module.exports.generateErrorResponse = function(msg, debug){
  return {
    message: msg,
    debug : debug,
    timestamp : new Date()
  }
}

/**
 * Generates error
 * @param {string} msgKey
 * @param {httpstatus} status
 */
module.exports.generateError = function(msgKey, status){
  let error = new Error(errorMessages.get(msgKey));
  error.status = status;
  return error;
}