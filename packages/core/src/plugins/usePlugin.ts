import { Injectable, ServiceKey } from '@ui-framework/ioc';
import { IPlugin } from '..';
import { plugins, registerConstant, registerProvider, registerService } from '../containers';
import { register as registerConfiguration } from '../startup/configurations';
import { register as registerReadyCallback } from '../startup/ready';

export function usePlugin(plugin: IPlugin) {
	const injectables = {
		providers: new Map<ServiceKey, Injectable<any>>(),
		services: new Map<ServiceKey, Injectable<any>>(),
		constants: new Map<ServiceKey, Injectable<any>>(),
	};

	if (plugin.inject) plugin.inject(injectables);
	if (plugin.install) plugin.install();
	if (plugin.configure) registerConfiguration(plugin.configure);
	if (plugin.ready) registerReadyCallback(plugin.ready);

	injectables.providers.forEach((injectable, serviceKey) => {
		registerProvider(serviceKey, injectable);
	});

	injectables.services.forEach((injectable, serviceKey) => {
		registerService(serviceKey, injectable);
	});

	injectables.constants.forEach((injectable, serviceKey) => {
		registerConstant(serviceKey, injectable);
	});

	plugins.registerFactory(plugin.name, () => ({
		plugin,
		injectables
	}));
}