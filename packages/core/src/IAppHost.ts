import { InjectableFactory } from '@ui-framework/ioc';
import { IModule } from './modules/IModule';
import { IPlugin } from './plugins/IPlugin';

export interface IAppHost {
	module<T>(module: IModule<T>);
	plugin(plugin: IPlugin);
	configure(configuration: InjectableFactory<any>);
	ready(readyCallback: InjectableFactory<any>);
	start();
}