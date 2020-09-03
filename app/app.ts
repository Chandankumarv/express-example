import express, {Application, json, urlencoded} from 'express';
import {RouteFactory} from './factories/routeFactory';
import {join} from 'path';
import {ROUTES} from './routes/routeList';
import {Route} from './contracts/route';
import Config from './config.json';

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const strategy = require('./middlewares/auth');
const createError = require('http-errors');
const globalErrorHandler = require('./error-handler/global-error-handler');

export class App {
    app: Application;
    routeFactory: RouteFactory;
    constructor() {
        this.app = express();
        this.routeFactory = new RouteFactory();
    }

    setViewEngine() {
        this.app.set('views', join(__dirname, Config.views.dir));
        this.app.set('view engine', Config.views.engine);
    }

    private configureLogger() {
        this.app.use(logger('dev'));
    }

    configureMiddlewares() {
        this.app.use(json());
        this.app.use(urlencoded({extended: false}));
        this.app.use(cookieParser());
    }

    configureRouters() {
        ROUTES.forEach(value => {
            let route: Route = this.routeFactory.get(value);
            this.app.use(value.path, route.registerRoute())
        })
    }

    configureAuth() {
        passport.use(strategy.jwtAuthStrategy);
        this.app.use(passport.initialize());
    }

    configureStaticFileServer() {
        this.app.use(express.static(join(__dirname, Config.public.dir)));
    }

    configureCors() {
        this.app.use((req,res,next) => {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', "*");
            next();
        });
    }

    configureNotFoundRoutes() {
        this.app.use(function(req, res, next) {
            next(createError(404));
        });
    }

    configureGlobalErrorHandler() {
        this.app.use(globalErrorHandler);
    }

    listen(port: number) {
        this.app.listen(port);
    }

    start(port: number) {
        this.setViewEngine();
        this.configureLogger();
        this.configureMiddlewares();
        this.configureAuth();
        this.configureStaticFileServer();
        this.configureCors();
        this.configureRouters();
        this.configureNotFoundRoutes();
        this.configureGlobalErrorHandler();
        this.listen(port);
    }
}