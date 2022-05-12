import { IModule } from '../modules/IModule';
import { modules, services, root } from './containers';
import { registerConfiguration, registerReadyCallback } from '.';

export function register(module: IModule<any>) {
	modules.registerFactory(module.name, async (container) => {
		return Promise.resolve(module);
	});

	if (module.configure) registerConfiguration(module.configure);
	if (module.ready) registerReadyCallback(module.ready);
	module.services.forEach((service, key) => services.register(key, service));
	module.providers.forEach((provider, key) => root.register(key, provider));
};

// export async function init() {

// }