import { HttpMethod, IHttpInterceptor, ResponseDetails } from '@ui-framework/http';
import { RequestOptions, TRequestOptions } from '@ui-framework/http/fetch';

export { createHttpProvider } from './createHttpProvider';
export { createHttpRequestFactory } from './createHttpRequestFactory';
export { httpServiceFactory } from './httpServiceFactory';

export const baseUrlDefaultKey = '$default';

export declare type HttpRequestFactoryInput<T, U = null> = {
	requestModel: Static<T>,
	responseModel?: Static<U>,
	options?: { requestOptions?: TRequestOptions, baseUrlKey?: string }
}

export declare type HttpDefaults = {
	requestOptions: RequestOptions;
	baseUrls: {
		[baseUrlDefaultKey]: string;
		[key: string]: string;
	}
}

export declare type HttpRouteDefinition<T = any, U = any> = {
	key: HttpRouteKey<T, U>,
	url: string,
	method: HttpMethod,
	interceptor?: IHttpInterceptor<any, any>
}
export declare type HttpRouteKey<T = any, U = any> = [reqType: Static<T>, respType: Static<U>];
export declare type HttpRoutes = Set<HttpRouteDefinition>;
export declare type HttpRouteDefinitionSetterMethod = (key: HttpRouteKey, url: string, interceptor?: IHttpInterceptor<InstanceType<typeof key[0]>, InstanceType<typeof key[1]>>) => HttpRouteDefinitionSetter;
export declare type HttpRouteDefinitionSetter = {
	get: HttpRouteDefinitionSetterMethod
	post: HttpRouteDefinitionSetterMethod;
	patch: HttpRouteDefinitionSetterMethod;
	put: HttpRouteDefinitionSetterMethod;
	delete: HttpRouteDefinitionSetterMethod;
	head: HttpRouteDefinitionSetterMethod;
}
export declare interface IHttpRouteDefinitionGetter {
	(): HttpRoutes;
	entry(key: HttpRouteKey): HttpRouteDefinition | null;
}
export declare type HttpRouteDefinitionApi = {
	get: IHttpRouteDefinitionGetter
	// add: (key: HttpRouteKey, entry: HttpRouteEntry) => HttpRouteDefinitionApi;
	set: HttpRouteDefinitionSetter
}

export declare type HttpInterceptors = Map<IHttpInterceptor<any, any>, HttpInterceptorOptions>;
export declare type HttpInterceptorOptions = {
	order?: number;
}
export declare type HttpInterceptorDefinitionApi = {
	get: () => Array<IHttpInterceptor<any, any>>;
	add: <T = any, U = any>(interceptor: IHttpInterceptor<T, U>, options?: HttpInterceptorOptions) => HttpInterceptorDefinitionApi;
}

export interface IHttpProvider {
	readonly defaults: HttpDefaults;
	// We want interceptors to be ordered.
	readonly interceptors: HttpInterceptorDefinitionApi;
	readonly routes: HttpRouteDefinitionApi;
	setDefaultRequestOptions(requestOptions: TRequestOptions): this;
	setBaseUrls(baseUrls: Record<string, string>): this;
}
export interface IHttpRequestFactory {
	/**
	 * TODO: Need to figure out how to infer the InstanceTypes of HttpRouteKey
	 * so that TS can provide the return type information for create.
	 */
	create(key: HttpRouteKey, options?: { requestOptions?: TRequestOptions, baseUrlKey?: string }): ((data: InstanceType<typeof key[0]>) => Promise<ResponseDetails<InstanceType<typeof key[0]>, InstanceType<typeof key[1]>>>) | null;
}