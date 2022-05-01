import { RequestDetails } from '@ui-framework/http';
import { createPipe, isUndefined, Operator } from '@ui-framework/utils';

import { IAppContext } from '../IAppContext';
import { ICommand } from './ICommand';
import { ICommandContext } from './ICommandContext';
import { ICommandHooks } from './ICommandHooks';

export function createCommand<TPayload, TResponseBody = null, TRequestBody = TPayload>(hooks: ICommandHooks<TPayload, TResponseBody, TRequestBody>, serviceBus): ICommand<TPayload, TResponseBody, TRequestBody> {
	const { init, willFetch, willStore, complete } = hooks;
	const commandHandlers: Operator<{ command: ICommandContext<TPayload, TResponseBody, TRequestBody>, app: IAppContext }, Error>[] = [];

	commandHandlers.push(function initHandler(ctx, next, done, fail) {
		serviceBus.init();

		!isUndefined(init) && init(
			ctx,
			function _next() {
				next(ctx);
			},
			function _fail(error: Error) {
				fail(error);
			},
			function _done() {
				done(ctx);
			}
		);
	});

	commandHandlers.push(function fetchHandler(ctx, next, done, fail) {
		let requestDetails;

		!isUndefined(willFetch) && willFetch(
			ctx,
			async function _next(requestDetails: RequestDetails<TRequestBody>) {
				await serviceBus.fetch(requestDetails); // what are we doing here?
				next(ctx);
			},
			function _fail(error: Error) {
				ctx.command
				fail(error);
			},
			function _done() {
				done(ctx);
			}
		);
	});

	commandHandlers.push(function storeHandler(ctx, next, done, fail) {
		let requestDetails;

		!isUndefined(willStore) && willStore(
			ctx,
			function _next() {
				next(ctx);
			},
			function _fail(error: Error) {
				fail(error);
			},
			function _done() {
				done(ctx);
			}
		);
	});

	commandHandlers.push(function completeHandler(ctx, next, done, fail) {

	});

	const pipe = createPipe(commandHandlers);

	return {
		cancel() {
			return new Promise((resolve, reject) => {

			});
		},

		execute(payload: TPayload) {
			return new Promise((resolve, reject) => {

			});
		},

		progress() {

		},

		undo() {
			return new Promise((resolve, reject) => {

			});
		},
	}
}