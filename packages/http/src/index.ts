import RequestOptions, { TRequestOptions } from './fetch/RequestOptions';
import ResponseContentType from './fetch/ResponseContentType';
import { HttpMethod } from './HttpMethod';
import HttpStatusCode from './HttpStatusCode';

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

export { IHttpInterceptor } from './IHttpInterceptor';
export { IHttpService } from './IHttpService';

export { default as ContentMimeType } from './ContentMimeType';
export { default as HttpError } from './HttpError';
export { HttpMethod, simpleHttpMethods } from './HttpMethod';
export { default as HttpStatusCode } from './HttpStatusCode';