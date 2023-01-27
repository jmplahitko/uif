
export { register as configure } from './startup/configurations'
export { register as constant } from './startup/constants';
export { register as provider } from './startup/providers';
export { register as ready } from './startup/ready';
export { register as service } from './startup/services';
export { start } from './startup/start';
export { useModule } from './modules/useModule';
export { usePlugin } from './plugins/usePlugin';

import { Injectable, InjectableFactory, ServiceKey } from '@ui-framework/ioc';

declare global {
	interface IStartupOptions {
		el: string;
	}

	interface IState {

	}

	interface IAppContext {

	}

	interface IAppSettings {

	}
}


export declare interface IModule<TState extends IState> {
	name: ServiceKey;
	// commands: Map<Static<any>, Injectable<ICommand<any>>>;
	state: TState;
	configure?: InjectableFactory<void>;
	ready?: InjectableFactory<void>;
}

export declare interface IPlugin {
	name: ServiceKey;
	// startup hooks
	install?();
	inject?(injectionMaps: PluginInjectables)
	configure?(configuration: InjectableFactory<void>);
	willStart?(); // ?? idk if there is something here or not..
	ready?: InjectableFactory<void>;
	// react quietly to system events
	listen?(event: any): void; // TODO - Events not complete
}

export declare type PluginInjectables = {
	providers: Map<ServiceKey, Injectable<any>>;
	services: Map<ServiceKey, Injectable<any>>;
	constants: Map<ServiceKey, Injectable<any>>;
}