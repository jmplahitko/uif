import { IModule } from './IModule';
import { modules } from '../containers';
import { register as registerConfiguration } from '../startup/configurations';
import { register as registerReadyCallback } from '../startup/ready';

export function createModule(module: IModule<any>) {
	modules.registerFactory(module.name, () => module);

	if (module.configure) registerConfiguration(module.configure);
	if (module.ready) registerReadyCallback(module.ready);
};