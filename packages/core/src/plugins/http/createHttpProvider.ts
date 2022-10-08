import { HttpMethod, IHttpInterceptor } from '@ui-framework/http';
import { RequestOptions, TRequestOptions } from '@ui-framework/http/fetch';
import { merge } from '@ui-framework/utils';
import { baseUrlDefaultKey, HttpDefaults, IHttpProvider } from '.';

export class HttpProvider implements IHttpProvider {
	private _defaults: HttpDefaults = {
		baseUrls: {
			[baseUrlDefaultKey]: ''
		},
		requestOptions: new RequestOptions()
	}
	private _interceptors: Array<IHttpInterceptor<any, any>> = [];
	private _routes: Map<Static<any>, [string, HttpMethod]> = new Map();

	constructor() {

	}

	get defaults() {
		return this._defaults;
	}

	get interceptors() {
		return this._interceptors;
	}

	get routes() {
		return this._routes;
	}

	public setBaseUrls(baseUrls: Record<string, string>) {
		this._defaults.baseUrls = merge(this._defaults.baseUrls, baseUrls);

		return this;
	}

	public setDefaultRequestOptions(requestOptions: TRequestOptions) {
		this._defaults.requestOptions = this._defaults.requestOptions.merge(requestOptions);

		return this;
	}

	public addRoutes(configure: (routes: Map<Static<any>, [string, HttpMethod]>) => void) {
		configure(this._routes);

		return this;
	}

	public addInterceptors(configure: (interceptors: Array<IHttpInterceptor<any, any>>) => void) {
		configure(this._interceptors);

		return this;
	}
}