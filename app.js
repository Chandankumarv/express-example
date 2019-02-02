var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("passport");
const strategy = require('./app/middlewares/auth');

const globalErrorHandler = require('./app/error-handler/global-error-handler');

const indexRouter = require('./app/routes/index');
const authRouter = require('./app/routes/auth-route');
const usersRouter = require('./app/routes/users');

var app = express();

/**
 * View Engine Setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Adding JWT Strategy to passport
 * And initialising passport
 */
passport.use(strategy.jwtAuthStrategy);
app.use(passport.initialize());


/**
 * Serving static files
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Cors Setup 
 */
const addAccessControlHeaders = function(req,res,next){
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', "*");
  next();
}

/**
 * Adding Cors
 */
app.use(addAccessControlHeaders);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

/**
 * Catching 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * Global Error Handler
 */
app.use(globalErrorHandler);

module.exports = app;
