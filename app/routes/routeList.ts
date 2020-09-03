import {RouteConfig} from '../contracts/routeConfig';
import {Index} from './index';

export const ROUTES: RouteConfig[] = [
    {
        path: '/',
        handler: Index
    }
]
