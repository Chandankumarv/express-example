'use strict';
const Promise = require('bluebird');
const userService = require('../services/user-service');
const config = require('../config/env-config');
var jwt = require('jsonwebtoken');
var responseGenerator = require('../common/response-generator')

/**
 * Checks email and password and provides JWT token
 * @param {user} user
 */
module.exports.login = function(user){
  return new Promise((resolve,reject)=>{
    userService.getUserByEmailAndPassword(user.email,user.password)
    .then((user)=>{
      if( ! user ){
        return reject(responseGenerator.generateError('invalid.user',422));
      }
      var payload = {id: user.id};
      var token = jwt.sign(payload, config.jwt.secretOrKey);
      resolve(token);
    })
  })
}
