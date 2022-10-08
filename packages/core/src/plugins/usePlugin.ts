import { Injectable, ServiceKey } from '@ui-framework/ioc';
import { IPlugin } from '..';
import { plugins } from '../containers';
import { register as configure } from '../startup/configurations';
import { register as constant } from '../startup/constants';
import { register as provider } from '../startup/providers';
import { register as service } from '../startup/services';
import { register as ready } from '../startup/ready';

export function usePlugin(plugin: IPlugin) {
	const injectables = {
		providers: new Map<ServiceKey, Injectable<any>>(),
		services: new Map<ServiceKey, Injectable<any>>(),
		constants: new Map<ServiceKey, Injectable<any>>(),
	};

	if (plugin.inject) plugin.inject(injectables);
	if (plugin.install) plugin.install();
	if (plugin.configure) configure(plugin.configure);
	if (plugin.ready) ready(plugin.ready);

	injectables.providers
		.forEach((injectable, serviceKey) => provider(serviceKey, injectable));

	injectables.services
		.forEach((injectable, serviceKey) => service(serviceKey, injectable));

	injectables.constants
		.forEach((injectable, serviceKey) => constant(serviceKey, injectable));

	plugins.registerFactory(plugin.name, () => ({
		plugin,
		injectables
	}));
}