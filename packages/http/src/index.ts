import RequestOptions, { TRequestOptions } from './fetch/RequestOptions';
import ResponseContentType from './fetch/ResponseContentType';
import { HttpMethod } from './HttpMethod';
import HttpStatusCode from './HttpStatusCode';

export const baseUrlDefaultKey = '$default';

export declare type HttpRequestFactoryInput<T> = {
	model: Static<T>,
	data: T,
	options?: { requestOptions?: TRequestOptions, baseUrlKey?: string }
}

export declare type HttpDefaults = {
	requestOptions: RequestOptions;
	baseUrls: {
		[baseUrlDefaultKey]: string;
		[key: string]: string;
	}
}

export declare type RequestDetails<T> = {
	data?: T;
	url: string;
	method: HttpMethod;
	options?: TRequestOptions;
}

export declare type ResponseDetails<T, U> = {
	data: U | null;
	error?: Error;
	request: RequestDetails<T>;
	responseContentType: ResponseContentType;
	status: HttpStatusCode;
	statusText: string;
	url: string;
};

export declare type ResponseParsingStrategy = {
	(response: Response): Promise<any>;
	type: ResponseContentType;
}

export { default as ContentMimeType } from './ContentMimeType';
export { default as HttpError } from './HttpError';
export { HttpMethod } from './HttpMethod';
export { HttpProvider } from './HttpProvider';
export { createHttpRequestFactory } from './HttpRequestFactory';
export { default as HttpStatusCode } from './HttpStatusCode';