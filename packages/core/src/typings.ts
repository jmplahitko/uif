import { Injectable, InjectableFactory, ServiceKey } from '@ui-framework/ioc';

declare global {
	namespace uif {
		interface IAppContext {}

		interface IAppSettings {}

		interface IModule<TState extends IState> {
			name: ServiceKey;
			// commands: Map<Static<any>, Injectable<ICommand<any>>>;
			state: TState;
			configure?: InjectableFactory<void>;
			ready?: InjectableFactory<void>;
		}

		interface IPlugin {
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

		interface IStartupOptions {
			el: string;
		}

		interface IState {}

		type PluginInjectables = {
			providers: Map<ServiceKey, Injectable<any>>;
			services: Map<ServiceKey, Injectable<any>>;
			constants: Map<ServiceKey, Injectable<any>>;
		}
	}
}