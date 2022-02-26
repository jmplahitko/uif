import { RequestDetails, ResponseDetails } from './index';
import CancellablePromise from './fetch/CancellablePromise';
import { TRequestOptions } from './fetch/RequestOptions';

export interface IHttpService {
	<T, U>(requestDetails: RequestDetails<T>): CancellablePromise<ResponseDetails<T, U>>;
	connect<T, U>(): Promise<ResponseDetails<T, U>>; // TODO
	delete<T, U>(url: string, data: T, options?: TRequestOptions): CancellablePromise<ResponseDetails<T, U>>;
	get<U>(url: string, options?: TRequestOptions): CancellablePromise<ResponseDetails<void, U>>;
	head<U>(url: string, options?: TRequestOptions): CancellablePromise<ResponseDetails<void, U>>;
	options<U>(url: string, options?: TRequestOptions): CancellablePromise<ResponseDetails<void, U>>;
	patch<T, U>(url: string, data: T, options?: TRequestOptions): CancellablePromise<ResponseDetails<T, U>>;
	post<T, U>(url: string, data: T, options?: TRequestOptions): CancellablePromise<ResponseDetails<T, U>>;
	put<T, U>(url: string, data: T, options?: TRequestOptions): CancellablePromise<ResponseDetails<T, U>>;
}