import {Route} from "./route";
import {Type} from "./type";

export interface RouteConfig {
    path: string;
    handler: Type<Route>;
}

