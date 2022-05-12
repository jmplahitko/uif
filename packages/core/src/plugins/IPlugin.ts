import { Injectable, InjectableFactory, ServiceKey } from '@ui-framework/ioc';
import { Operator } from '@ui-framework/utils';
import { IModule } from '../modules/IModule';

type PluginInjectables = {
	providers: Map<ServiceKey, Injectable<any>>;
	services: Map<ServiceKey, Injectable<any>>;
}

export interface IPlugin {
	inject?(injectables: PluginInjectables): void;
	configure?: InjectableFactory<void>;
	modules?(): IModule<any>[];
	beforeStart?: InjectableFactory<void | Error>;
	start?: InjectableFactory<void>;
	ready?: InjectableFactory<void>;
}