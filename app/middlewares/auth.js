const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const userService = require('../services/user-service');
const config = require('../config/env-config');
const responseGenerator = require('../common/response-generator')

const jwtOptions = {
  secretOrKey:config.jwt.secretOrKey
};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

/**
 * Creating JWT Strategy for passport
 * 
 * @param {string} jwt_payload 
 * @param {callback} next 
 */
async function jwtAuthenticate(jwt_payload, next) {
  var user =await userService.getUserById(jwt_payload.id).catch(next);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
}

/**
 * Function which will be called when API needs to be authenticated
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {callback} next 
 */
function isAuthenticated(req,res,next){
  passport.authenticate('jwt', { session:false },function(err, user, info){
    if (err) { 
      return next(err); 
    }
    if (!user) { 
      res.status(401).send(responseGenerator.generateErrorResponse("Unauthenticated request"));
    }else{
      return next();
    }
  })(req,res,next);
}

module.exports={
  jwtAuthStrategy : new JwtStrategy(jwtOptions, jwtAuthenticate),
  isAuthenticated : isAuthenticated
}
