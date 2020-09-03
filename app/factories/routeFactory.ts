import {RouteConfig} from "../contracts/routeConfig";

export class RouteFactory{
    get(route: RouteConfig) {
        return new route.handler();
    }
}
