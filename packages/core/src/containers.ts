import { Container, Injectable, Lifespan, ReuseScope, ServiceKey } from '@ui-framework/ioc';

const root = new Container();
const configurations = root.spawn('@configurations');
const services = root.spawn('@services');

const readyCallbacks = root.spawn('@readyCallbacks');
const modules = services.spawn('@modules');
const plugins = services.spawn('@plugins');

const registerConstant = (serviceKey: ServiceKey, injectable: Injectable<any>) => {
	root.register(serviceKey, injectable)
		.reusedWithin(ReuseScope.container)
		.withLifespan(Lifespan.transient)
		.asDurable();
}

const registerProvider = (serviceKey: ServiceKey, injectable: Injectable<any>) => {
	root.register(serviceKey, injectable)
		.asDurable();
}

const registerService = (serviceKey: ServiceKey, injectable: Injectable<any>) => {
	services.register(serviceKey, injectable)
		.asDurable();
}

export {
	configurations,
	modules,
	plugins,
	readyCallbacks,
	root,
	services,
	registerService,
	registerProvider,
	registerConstant
};