import { Injectable, ServiceKey } from '@ui-framework/ioc';
import { root } from '../containers';

export function register(serviceKey: ServiceKey, injectable: Injectable<any>) {
	root.register(serviceKey, injectable)
		.asDurable();
};