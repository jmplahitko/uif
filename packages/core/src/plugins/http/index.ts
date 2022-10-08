import { HttpMethod, IHttpInterceptor, RequestDetails } from '@ui-framework/http';
import { RequestOptions, TRequestOptions } from '@ui-framework/http/fetch';

export const baseUrlDefaultKey = '$default';

export declare type HttpRequestFactoryInput<T> = {
	model: Static<T>,
	data?: T,
	options?: { requestOptions?: TRequestOptions, baseUrlKey?: string }
}

export declare type HttpDefaults = {
	requestOptions: RequestOptions;
	baseUrls: {
		[baseUrlDefaultKey]: string;
		[key: string]: string;
	}
}

export interface IHttpProvider {
	readonly defaults: HttpDefaults;
	// We want interceptors to be ordered.
	readonly interceptors: Array<IHttpInterceptor<any, any>>;
	readonly routes: Map<Static<any>, [string, HttpMethod]>;
	setDefaultRequestOptions(requestOptions: TRequestOptions): this;
	setBaseUrls(baseUrls: Record<string, string>): this;
	addRoutes(configurer: (routes: Map<Static<any>, [string, HttpMethod]>) => void): this;
	addInterceptors(configurer: (interceptors: Array<IHttpInterceptor<any, any>>) => void): this;
}

export interface IHttpRequestFactory {
	<T>(input: HttpRequestFactoryInput<T>): RequestDetails<T> | null;
}