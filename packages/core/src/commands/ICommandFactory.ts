import { ICommand } from './ICommand';

export interface ICommandFactory {
	get<T>(type: Static<T>): ICommand<T>;
}