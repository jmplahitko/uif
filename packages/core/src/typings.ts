import { Injectable, InjectableFactory, ServiceKey } from '@ui-framework/ioc';
import { ResponseDetails } from '@ui-framework/http';

export interface ICommand<TPayload, TResponseBody = null, TRequestBody = TPayload> {
	cancel(): Promise<ICommandContext<TPayload, TResponseBody, TRequestBody>>;
	execute(payload: TPayload): Promise<ICommandContext<TPayload, TResponseBody, TRequestBody>>;
	progress(handler: (number) => void);
	undo(): Promise<ICommandContext<TPayload, TResponseBody, TRequestBody>>;
}

export enum CommandStatus {
	none = 0, // 0
	pending = 1 << 0, // 1
	completed = 1 << 1, // 2
	succeeded = 1 << 2, // 4
	failed = 1 << 3, // 8
}

export interface ICommandContext<TPayload, TResponseBody = null, TRequestBody = TPayload> {
	model: Static<TPayload>;
	status: CommandStatus;
	payload: TPayload;
	httpResult: ResponseDetails<TRequestBody, TResponseBody> | null;
	state: {
		previous: Partial<IState>;
		current: Partial<IState>;
	} | null;
	error: Error | null;
}

export interface ICommandProvider {
	commands: Map<Static<any>, ICommand<any>>;
	addCommand<T>(type: Static<T>, commandHooks: ICommand<T>)
}

export interface IModule<TState extends IState> {
	name: ServiceKey;
	commands: Map<Static<any>, Injectable<ICommand<any>>>;
	state: TState;
	configure?: InjectableFactory<void>;
	ready?: InjectableFactory<void>;
}


export type PluginInjectables = {
	providers: Map<ServiceKey, Injectable<any>>;
	services: Map<ServiceKey, Injectable<any>>;
	constants: Map<ServiceKey, Injectable<any>>;
}
// This is tentative.
export interface IPlugin {
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

export interface IAppContext {}

export interface IAppSettings {}

export interface IState {}

export interface IStartupOptions {
	el: string;
	settings?: {
		settingsUrl?: string;
	};
}
