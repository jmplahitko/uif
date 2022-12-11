import { Container } from '@ui-framework/ioc/.';
import { concat } from '@ui-framework/utils';
import { IRouteConfig, IRouteDefinition } from '.';

export function registerRoute(container: Container, route: IRouteDefinition<any>): IRouteConfig<any> {
	let beforeEnter;
	let component;
	let components;
	let children;

	const serviceKey = concat(`${route.name}:`);

	if (route.beforeEnter) {
		container.register(serviceKey('beforeEnter'), route.beforeEnter);
		beforeEnter = () => container.resolve(serviceKey('beforeEnter'));
	}

	if (route.component) {
		container.register(serviceKey('component'), route.component);
		component = () => container.resolve(serviceKey('component'));
	}

	if (route.components) {
		container.register(serviceKey('components'), route.components);
		components = () => container.resolve(serviceKey('components'));
	}

	if (route.children) {
		children = route.children.map(child => registerRoute(container, child));
	}

	return {
		...route,
		beforeEnter,
		component,
		components,
		children
	};
}