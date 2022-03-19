import { IActionPlan } from '../commands/ICommandHooks';
import { ServiceFactory } from '@ui-framework/ioc';

export type TInjectable<T> = Static<T> | ServiceFactory<T>;

export interface IModule<TState> {
	name: string;
	actions: Map<symbol, TInjectable<IActionPlan<any>>>;
	state: TState;
	services: Map<symbol, TInjectable<any>>;
	providers: Map<symbol, TInjectable<any>>;
	configure();
	ready();
}