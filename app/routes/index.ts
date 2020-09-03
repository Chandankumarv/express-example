import {Route} from '../contracts/route';
import {Router} from 'express';

export class Index implements Route {
    router: Router;
    constructor() {
        this.router = Router();
    }

    registerRoute(): Router {
        this.router.get('/', (req, res, next) => {
            res.render('index', { title: 'Express' });
        });
        return this.router;
    }

}