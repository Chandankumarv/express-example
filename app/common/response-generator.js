`use strict`
const responseMessages = require('../config/responseMessages.json');
const errorMessages = require('../config/errorMessages.json');

/**
 * Generates success response
 * @param {object} data
 * @param {string} msgKey
 */
module.exports.generateSuccessResponse = function(data, msgKey){
  return {
    data: data,
    message: responseMessages[msgKey],
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
  let error = new Error(errorMessages[msgKey]);
  error.status = status;
  return error;
}