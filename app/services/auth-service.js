'use strict';
const Promise = require('bluebird');
const userService = require('../services/user-service');
const config = require('../config/env-config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const responseGenerator = require('../common/response-generator')
const appConstants = require('../common/app-constants');

/**
 * Checks email and password and provides JWT token
 * @param {user} user
 */
module.exports.login = function(user){
  return new Promise((resolve,reject)=>{
    return userService.getUserByEmail(user.email).then((fetchedUser)=>{
      if( ! user ){
        return reject(responseGenerator.generateError('invalid.user',422));
      }
      return bcrypt.compare(user.password, fetchedUser.password).then((matched)=>{
        if(matched){
          var payload = {id: user.id};
          var token = jwt.sign(payload, config.jwt.secretOrKey);
          return resolve(token);
        }else{
          return reject(responseGenerator.generateError('email.password.incorrect',422))
        }
      })
    })
  })
}
