import { ICommandHooks } from './ICommandHooks';

export interface ICommandProvider {
	commands: Map<Static<any>, ICommandHooks<any>>;
	addCommand<T>(type: Static<T>, commandHooks: ICommandHooks<T>)
}