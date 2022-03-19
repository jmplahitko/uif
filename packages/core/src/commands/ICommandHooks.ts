import { RequestDetails } from '@ui-framework/http';
import { IAppContext } from '../IAppContext';
import { IState } from '../IState';
import { ICommandContext } from './ICommandContext';

export interface ICommandHooks<TPayload, TResponseBody = null, TRequestBody = TPayload> {
	init?(
		context: { command: ICommandContext<TPayload, TResponseBody, TRequestBody>, app: IAppContext },
		next: () => void,
		fail: (err: Error) => void,
		done: () => void
	): void;
	willFetch?(
		context: { command: ICommandContext<TPayload, TResponseBody, TRequestBody>, app: IAppContext },
		next: (httpRequest: RequestDetails<TRequestBody>) => void,
		fail: (err: Error) => void,
		done: () => void
	),
	willStore?(
		context: { command: ICommandContext<TPayload, TResponseBody, TRequestBody>, app: IAppContext },
		next: (state: Partial<IState>) => void,
		fail: (err: Error) => void,
		done: () => void
	): void;
	complete?(
		context: { command: ICommandContext<TPayload, TResponseBody, TRequestBody>, app: IAppContext },
		next: () => void,
		fail: (err: Error) => void,
		done: () => void
	): void;
}
