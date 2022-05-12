import { ICommandHooks } from '../commands/ICommandHooks';
import { Injectable, InjectableFactory, ServiceKey } from '@ui-framework/ioc';
import { IState } from '../IState';

export interface IModule<TState extends IState> {
	name: string;
	commands: Map<Static<any>, Injectable<ICommandHooks<any>>>;
	state: TState;
	services: Map<ServiceKey, Injectable<any>>;
	providers: Map<ServiceKey, Injectable<any>>;
	configure?: InjectableFactory<void>;
	ready?: InjectableFactory<void>;
}