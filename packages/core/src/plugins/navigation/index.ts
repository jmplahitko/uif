export enum RouterMode {
	hash = 'hash',
	history = 'history',
	abstract = 'abstract'
}

export declare type RouterDefaults = {
	mode: RouterMode;
	base: string;
}

export declare type TRouterFactoryConfig = {
	options: RouterDefaults;
	routes: any;
	onReady: Function;
	onError: Function;
	beforeEach: Function[];
	beforeResolve: Function[];
	afterEach: Function[];
};

export interface IRouteConfig {
	// path: string;
	// name?: string;
	// component?: Component;
	// components?: Dictionary<Component>;
	// redirect?: RedirectOption;
	// alias?: string | string[];
	// children?: TRouteConfig[];
	// meta?: any;
	// beforeEnter?: TRouterMiddlewareObj<NavigationGuard>;
	// props?: boolean | Object | RoutePropsFunction;
	// caseSensitive?: boolean;
	// pathToRegexpOptions?: PathToRegexpOptions;
}


export type RouteDefinition = {};

export interface IRouter {

}

export interface IRouteDescription {

}

export interface IRouterProvider {
	defaults: RouterDefaults;
	routes: { [routeName: string]: Record<string, any> /** TODO */ }
}