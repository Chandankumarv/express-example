const express = require('express');
const router = express.Router();
const userService = require('../services/user-service');
const auth = require('../middlewares/auth');
var responseGenerator = require('../common/response-generator');

/**
 * Gets list of all users
 * @method get
 * @returns {user[]}
 * */
router.get('/'
  ,auth.isAuthenticated
  ,function(req, res, next) {
    userService.getAllUsers().then((result)=>{
      res.send(responseGenerator.generateSuccessResponse(result,'user.list'));
    }).catch(next)
  }
);

/**
 * Gets list of all users
 * @method get
 * @returns {user}
 * */
router.get('/:id'
  ,auth.isAuthenticated
  ,function(req, res, next) {
    userService.getUserById(req.params.id).then((result)=>{
      res.send(responseGenerator.generateSuccessResponse(result,'user.details'));
    }).catch(next)
  }
);

/**
 * Create a user
 * @method post
 * @returns {user}
 * */
router.post('/register', function(req, res, next) {
  userService.createUser(req.body).then((result)=>{
    res.send(responseGenerator.generateSuccessResponse(result,'registration.success'));
  })
});

module.exports = router;
