import { IRouteConfig, IRouterProvider, RouteDefinition, RouterDefaults, RouterMode } from '.';
import { Container, InjectableFactory } from '@ui-framework/ioc';
import { copy, merge } from '@ui-framework/utils';

export type TRoutesFactory<T> = (...deps: any[]) => T;
export type TRouterMiddleware<T> = (dep?: string, ...deps: string[]) => T;
export type TRouterMiddlewareDefinition<T> = [TRouterMiddleware<T>, string[]];

export function createRouterProvider(container: Container): IRouterProvider {
	let _defaults: RouterDefaults = {
		mode: RouterMode.history,
		base: '/'
	};
	const routeDefinitions = container.spawn('@@routeDefinitions');
	const resolvedRouteDefinitions: Record<string, IRouteConfig> = {};

	const _beforeEach: TRouterMiddlewareDefinition<any>[] = [];
	const _beforeResolve: TRouterMiddlewareDefinition<any>[] = [];
	const _afterEach: TRouterMiddlewareDefinition<any>[] = [];
	const _onError: TRouterMiddlewareDefinition<any> = [() => () => {}, []];
	const _onReady: TRouterMiddlewareDefinition<any> = [() => () => {}, []];

	const provider: IRouterProvider = {
		get defaults() {
			return copy(_defaults)
		},
		routes: {},
		setDefaults,
		addRoutes,

	}

	function _resolveMiddlewaresFor(middlewares: TRouterMiddlewareDefinition<T>[]): T[] {
		// return middlewares.map((middlewareDefinition) => this._resolveMiddleware<T>(middlewareDefinition));
	}

	function _resolveMiddleware<T>(middlewareDefinition: TRouterMiddlewareDefinition<T>): T {
		// let [middleware, deps] = middlewareDefinition;
		// deps = this._container.resolveList(deps || []);

		// return middleware(...deps);
	}

	function _resolveRoutes(routeDefinitions: { [name: string]: TRouteDefinition }): any[] {
		// let routes: any[] = [];
		// for (let name in routeDefinitions) {
		// 	let routeDefinition = routeDefinitions[name];
		// 	let deps = this._container.resolveList(routeDefinition.dependencies);
		// 	routes = routes.concat(routeDefinition.factory(...deps));
		// }

		// return routes;
	}

	function setDefaults(defaults: RouterDefaults): IRouterProvider {
		_defaults = merge(_defaults, defaults);
		return provider;
	}

	function addRoutes(name: string, factory: InjectableFactory<RouteDefinition[]>): IRouterProvider {
		routeDefinitions.register(name, factory);

		return provider;
	}

	function afterEach<T>(middleware: TRouterMiddleware<any>, deps: string[] = []): IRouterProvider {
		this._afterEach.push([middleware, deps]);
		return provider;
	}

	function beforeEach<T>(middleware: TRouterMiddleware<any>, deps: string[] = []): IRouterProvider {
		this._beforeEach.push([middleware, deps]);
		return provider;
	}

	function beforeResolve<T>(middleware: TRouterMiddleware<any>, deps: string[] = []): IRouterProvider {
		this._beforeResolve.push([middleware, deps]);
		return provider;
	}

	function onReady<T>(middleware: TRouterMiddleware<any>, deps: string[] = []): IRouterProvider {
		this._onReady = [middleware, deps];
		return provider;
	}

	function onError(middleware: TRouterMiddleware<any>, deps: string[] = []): IRouterProvider {
		this._onError = [middleware, deps];
		return provider;
	}

	function getRouteDefinitionFor<T>(name: string): RouteDefinition | null {
		// return _routeDefinitions[name]; // TODO
		return null;
	}

	function getAllRouteDefinitions<T>(): { [name: string]: RouteDefinition } {
		// return _routeDefinitions; // TODO
		return {};
	}

	// public make<T>(factory: (config: TRouterFactoryConfig) => T): T {
	// 	let afterEach = this._resolveMiddlewaresFor<Function>(this._afterEach);
	// 	let beforeEach = this._resolveMiddlewaresFor<Function>(this._beforeEach);
	// 	let beforeResolve = this._resolveMiddlewaresFor<Function>(this._beforeResolve);
	// 	let options = this.options;
	// 	let onReady = this._resolveMiddleware<Function>(this._onReady);
	// 	let onError = this._resolveMiddleware<Function>(this._onError);
	// 	let routes = this._resolveRoutes(this._routeDefinitions);

	// 	return factory({
	// 		afterEach,
	// 		beforeEach,
	// 		beforeResolve,
	// 		options,
	// 		onReady,
	// 		onError,
	// 		routes
	// 	});
	// }

	return provider;
}
