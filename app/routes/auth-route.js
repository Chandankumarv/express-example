'use strict';

var express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');
var responseGenerator = require('../common/response-generator');

/**
 * Login route
 * @method post
 * @returns {string} token 
 * */
router.post('/login', function(req, res, next) {
  authService.login(req.body).then((result)=>{
    res.send(responseGenerator.generateSuccessResponse(result,'login.success'));
  }).catch(next)
});

module.exports = router;
