import { IRouterProvider, IRouteDefinition, RouterDefaults, RouterMode, RouterMiddlewareDefinition, RouterMiddlewareConfig, IRouteConfig } from '.';
import { Container, ServiceFactory } from '@ui-framework/ioc';
import { copy } from '@ui-framework/utils';
import { registerRouterMiddleware } from './registerRouterMiddleware';
import { registerRoute } from './registerRoute';


export function createRouterProvider(options?: uif.IStartupOptions): ServiceFactory<IRouterProvider> {
	return function routerProviderFactory(container: Container): IRouterProvider {
		let _defaults: RouterDefaults = {
			mode: RouterMode.history,
			base: '/',
			...options?.navigation ?? {}
		};
		const routeDefinitions = container.spawn('@@routeDefinitions');
		const routeConfigs: IRouteConfig<any>[] = [];
		const routerMiddlewareDefinitions = container.spawn('@@routerMiddlewareDefinitions');
		const routerMiddlewareConfigs: RouterMiddlewareConfig<any, any>[] = [];

		const provider: IRouterProvider = {
			get defaults() {
				return copy(_defaults);
			},
			middlewares: {
				add(def: RouterMiddlewareDefinition) {
					const config = registerRouterMiddleware(routerMiddlewareDefinitions, def);
					routerMiddlewareConfigs.push(config);

					return provider.middlewares;
				},
				get() {
					return routerMiddlewareConfigs;
				}
			},
			routes: {
				add(route: IRouteDefinition<any>) {
					const config = registerRoute(routeDefinitions, route);
					routeConfigs.push(config);

					return provider.routes;
				},
				get() {
					return routeConfigs;
				}
			},
		}

		return provider;
	}
}
