import { ICommandHooks } from '../commands/ICommandHooks';
import { ServiceFactory } from '@ui-framework/ioc';
import { IState } from '../IState';

export type TInjectable<T> = Static<T> | ServiceFactory<T>;

export interface IModule<TState extends IState> {
	name: string;
	commands: Map<Static<any>, TInjectable<ICommandHooks<any>>>;
	state: TState;
	services: Map<string|symbol, TInjectable<any>>;
	providers: Map<string|symbol, TInjectable<any>>;
	configure();
	ready();
}