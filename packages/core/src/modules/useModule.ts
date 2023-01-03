import { modules } from '../containers';
import { register as configure } from '../startup/configurations';
import { register as ready } from '../startup/ready';
import { IModule } from '..';

export function useModule(module: IModule<any>) {
	modules.registerFactory(module.name, () => module);

	if (module.configure) configure(module.configure);
	if (module.ready) ready(module.ready);
};