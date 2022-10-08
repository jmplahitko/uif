import { HttpMethod, IHttpInterceptor } from '@ui-framework/http';
import { RequestOptions, TRequestOptions } from '@ui-framework/http/fetch';
import { merge } from '@ui-framework/utils';
import { baseUrlDefaultKey, HttpDefaults, IHttpProvider } from '.';

export function createHttpProvider(): IHttpProvider {
	const _defaults: HttpDefaults = {
		baseUrls: {
			[baseUrlDefaultKey]: ''
		},
		requestOptions: new RequestOptions()
	}
	const _interceptors: Array<IHttpInterceptor<any, any>> = [];
	const _routes: Map<Static<any>, [string, HttpMethod]> = new Map();

	const provider = {
		get defaults() {
			return _defaults;
		},

		get interceptors() {
			return _interceptors;
		},

		get routes() {
			return _routes;
		},
		setBaseUrls(baseUrls: Record<string, string>) {
			_defaults.baseUrls = merge(_defaults.baseUrls, baseUrls);
			return provider;
		},
		setDefaultRequestOptions(requestOptions: TRequestOptions) {
			_defaults.requestOptions = _defaults.requestOptions.merge(requestOptions);
			return provider;
		},
		addRoutes(configure: (routes: Map<Static<any>, [string, HttpMethod]>) => void) {
			configure(_routes);
			return provider;
		},
		addInterceptors(configure: (interceptors: Array<IHttpInterceptor<any, any>>) => void) {
			configure(_interceptors);
			return provider;
		}
	}

	return provider;
}