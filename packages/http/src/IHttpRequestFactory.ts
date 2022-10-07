import { HttpRequestFactoryInput, RequestDetails } from './index';

export interface IHttpRequestFactory {
	<T>(input: HttpRequestFactoryInput<T>): RequestDetails<T> | null;
}