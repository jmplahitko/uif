import { Injectable, ServiceFactory, ServiceKey } from '@ui-framework/ioc';
import { root } from '../containers';

function register(serviceKey: ServiceKey, injectable: ServiceFactory<any>)
function register(serviceKey: ServiceKey, injectable: Injectable<any>) {
	(injectable.$inject
		? root.register(serviceKey, injectable as Injectable<any>)
		: root.registerFactory(serviceKey, injectable as ServiceFactory<any>))
			.asDurable();
};

export { register };