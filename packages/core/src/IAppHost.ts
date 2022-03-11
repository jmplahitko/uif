import { IModule } from './modules/IModule';

export interface IAppHost {
	splash(factory: (el: Element) => void): IAppHost;
	module<T>(module: IModule<T>): IAppHost;
	configure(configFn: (...providers: Array<any>) => void, dependencies: Array<string | symbol>): IAppHost;
	ready(readyFn: (...services: Array<any>) => void, dependencies: Array<string | symbol>): IAppHost;
	start();
}