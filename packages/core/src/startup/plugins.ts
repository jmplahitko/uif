import { IModule } from '../modules/IModule';
import { modules, services, root } from './containers';
import { register as registerConfiguration } from './configurations';
import { register as registerReadyCallback } from './ready';

export function register(module: IPlugin<any>) {
	modules.registerFactory(module.name, async (container) => {
		return Promise.resolve(module);
	});

};

export async function init() {

}