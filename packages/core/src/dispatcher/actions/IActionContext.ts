import { ResponseDetails } from '@ui-framework/http';
import { ActionStatus } from './ActionStatus';
import { IActionError } from './IActionError';

export interface IActionContext<P, R = P> {
	type: symbol;
	status: ActionStatus;
	payload: P;
	http?: ResponseDetails<P, R>;
	error: IActionError | null;
}