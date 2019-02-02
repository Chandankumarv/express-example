const userModel = require('../models').User;
const Promise = require('bluebird');

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
  return new Promise((resolve,reject)=>{
    userModel.create(user).then((result)=>{
      resolve(result);
    }).catch((error)=>{
      reject(error);
    })
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
