import { ICommandContext } from './ICommandContext';

export interface ICommand<TPayload, TResponseBody = null, TRequestBody = TPayload> {
	cancel(): Promise<ICommandContext<TPayload, TResponseBody, TRequestBody>>;
	execute(payload: TPayload): Promise<ICommandContext<TPayload, TResponseBody, TRequestBody>>;
	progress(handler: (number) => void);
	undo(): Promise<ICommandContext<TPayload, TResponseBody, TRequestBody>>;
}