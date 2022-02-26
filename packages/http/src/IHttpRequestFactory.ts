import { HttpRequestFactoryInput, RequestDetails } from './index';

export interface IHttpRequestFactory {
	<T = any>(input: HttpRequestFactoryInput<T>): RequestDetails<T> | null;
}