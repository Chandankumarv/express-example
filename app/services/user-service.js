'use strict';

const userModel = require('../models').User;
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const appConstants = require('../common/app-constants');

/**
 * Fetch all users
 */
module.exports.getAllUsers = function(){
  return new Promise((resolve,reject)=>{
    userModel.findAll().then((result)=>{
      resolve(result);
    }).catch((error)=>{
      reject(error);
    })
  })
  
}

/**
 * Creates user
 * @param {user} user
 */
module.exports.createUser = function(user){
  console.log(user.password, appConstants.saltRounds)
  return bcrypt.hash(user.password , appConstants.saltRounds).then((hashedPassword) =>{
    user.password = hashedPassword;
    return userModel.create(user);
  })
}

/**
 * Fetch user by userId
 * @param {long} userId
 */
module.exports.getUserById = function(userId){
  return userModel.findByPk(userId);
}

/**
 * Fetch user by email and password
 * @param {string} email
 * @param {string} password
 */
module.exports.getUserByEmailAndPassword = function(email, password){
  return new Promise((resolve,reject)=>{
    userModel.findOne({
      where:{
        email:email,
        password:password
      }
    }).then((result)=>{
      resolve(result);
    }).catch((error)=>{
      reject(error);
    })
  })
}

/**
 * Fetch user by email 
 * @param {string} email
 */
module.exports.getUserByEmail = function(email){
  return userModel.findOne({
    where:{
      email:email,
    }
  })
}