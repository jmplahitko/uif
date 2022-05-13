import { ResponseDetails } from '@ui-framework/http';
import { CommandStatus } from './CommandStatus';
import { IHandleableError } from '../IHandleableError';

export interface ICommandContext<TPayload, TResponseBody = null, TRequestBody = TPayload> {
	model: Static<TPayload>;
	status: CommandStatus;
	payload: TPayload;
	httpResult: ResponseDetails<TRequestBody, TResponseBody> | null;
	state: {
		previous: Partial<IState>;
		current: Partial<IState>;
	} | null;
	error: IHandleableError | null;
}