export * from './typings';

export { register as configure } from './startup/configurations'
export { register as ready } from './startup/ready';
export { start } from './startup/start';
import { ResponseDetails } from '@ui-framework/http';
export { useModule } from './modules/useModule';
export { usePlugin } from './plugins/usePlugin';

export interface ICommand<TPayload, TResponseBody = null, TRequestBody = TPayload> {
	cancel(): Promise<ICommandContext<TPayload, TResponseBody, TRequestBody>>;
	execute(payload: TPayload): Promise<ICommandContext<TPayload, TResponseBody, TRequestBody>>;
	progress(handler: (number) => void);
	undo(): Promise<ICommandContext<TPayload, TResponseBody, TRequestBody>>;
}

export enum CommandStatus {
	none = 0, // 0
	pending = 1 << 0, // 1
	completed = 1 << 1, // 2
	succeeded = 1 << 2, // 4
	failed = 1 << 3, // 8
}

export interface ICommandContext<TPayload, TResponseBody = null, TRequestBody = TPayload> {
	model: Static<TPayload>;
	status: CommandStatus;
	payload: TPayload;
	httpResult: ResponseDetails<TRequestBody, TResponseBody> | null;
	state: {
		previous: Partial<uif.IState>;
		current: Partial<uif.IState>;
	} | null;
	error: Error | null;
}

export interface ICommandProvider {
	commands: Map<Static<any>, ICommand<any>>;
	addCommand<T>(type: Static<T>, commandHooks: ICommand<T>)
}