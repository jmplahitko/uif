import { HttpDefaults } from './index';
import { HttpMethod } from './HttpMethod';
import { IHttpInterceptor } from './IHttpInterceptor';
import { TRequestOptions } from './fetch/RequestOptions';

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