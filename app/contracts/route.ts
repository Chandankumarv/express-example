import {Router} from 'express';

export interface Route {
    registerRoute(): Router;
}
