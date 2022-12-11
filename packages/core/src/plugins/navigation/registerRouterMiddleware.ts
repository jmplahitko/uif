import { Container } from '@ui-framework/ioc/.';
import { RouterMiddlewareConfig, RouterMiddlewareDefinition, RouterMiddlewareType } from '.';

const routerMiddlewareCounts = {
	[RouterMiddlewareType.onEnter]: 0,
	[RouterMiddlewareType.onError]: 0,
	[RouterMiddlewareType.onLeave]: 0,
	[RouterMiddlewareType.onReady]: 0,
	[RouterMiddlewareType.onResolve]: 0
};

export function registerRouterMiddleware(container: Container, def: RouterMiddlewareDefinition): RouterMiddlewareConfig<any, any> {
	routerMiddlewareCounts[def.type]++;
	const serviceKey = `${def.type}:${routerMiddlewareCounts[def.type].toString()}`;

	container.register(
		serviceKey,
		(...args) => def.middleware(...args)
	);

	return {
		type: def.type,
		middleware: () => container.resolve(serviceKey)
	};
}