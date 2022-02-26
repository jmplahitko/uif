import { Operator } from '@ui-framework/utils';
import { RequestDetails, ResponseDetails } from './index';

export interface IHttpInterceptor<T, U = null> {
	onRequest?: Operator<RequestDetails<T>>;
	onResponse?: Operator<ResponseDetails<T, U>>;
}
