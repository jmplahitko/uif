import { ICommandHooks } from '../commands/ICommandHooks';
import { Injectable, InjectableFactory } from '@ui-framework/ioc';

export interface IModule<TState extends IState> {
	name: string;
	commands: Map<Static<any>, Injectable<ICommandHooks<any>>>;
	state: TState;
	configure?: InjectableFactory<void>;
	ready?: InjectableFactory<void>;
}