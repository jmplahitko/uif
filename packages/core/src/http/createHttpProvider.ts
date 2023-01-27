import { HttpMethod, IHttpInterceptor } from '@ui-framework/http';
import { RequestOptions, TRequestOptions } from '@ui-framework/http/fetch';
import { equals, merge } from '@ui-framework/utils';
import {
	baseUrlDefaultKey,
	HttpDefaults,
	HttpInterceptorDefinitionApi,
	HttpInterceptorOptions,
	HttpRouteDefinitionApi,
	HttpRouteDefinitionSetter,
	HttpRouteKey,
	HttpRoutes,
	IHttpProvider,
	IHttpRouteDefinitionGetter
} from '.';

export function createHttpProvider(): IHttpProvider {
	const _defaults: HttpDefaults = {
		baseUrls: {
			[baseUrlDefaultKey]: ''
		},
		requestOptions: new RequestOptions()
	}
	const _interceptors: Map<IHttpInterceptor<any, any>, HttpInterceptorOptions> = new Map();
	const _interceptorsApi: HttpInterceptorDefinitionApi = {
		get() {
			return Array.from(_interceptors)
				.sort((a, b) => (a[1].order ?? 0) - (b[1].order ?? 0))
				.map(x => x[0]);
		},
		add<T, U>(interceptor: IHttpInterceptor<T, U>, options?: HttpInterceptorOptions) {
			_interceptors.set(interceptor, options ?? {});

			return _interceptorsApi;
		}
	}

	const _routes: HttpRoutes = new Set();
	const _setRoute = (method: HttpMethod) => (key, url, interceptor?) => {
		_routes.add({
			method,
			key,
			url,
			interceptor
		});
		return routesSetter;
	};
	const routesSetter: HttpRouteDefinitionSetter = {
		get: _setRoute(HttpMethod.get),
		delete: _setRoute(HttpMethod.delete),
		head: _setRoute(HttpMethod.head),
		patch: _setRoute(HttpMethod.patch),
		post: _setRoute(HttpMethod.post),
		put: _setRoute(HttpMethod.put),
	};
	const routesGetter: IHttpRouteDefinitionGetter = function() {
		return _routes;
	};
	routesGetter.entry = (key: HttpRouteKey) => {
		return Array.from(_routes)
			.filter(x => equals(x.key, key))?.[0] ?? null;
	}
	const routesApi: HttpRouteDefinitionApi = {
		get: routesGetter,
		set: routesSetter
	};

	const provider = {
		get defaults() {
			return _defaults;
		},
		interceptors: _interceptorsApi,
		routes: routesApi,

		setBaseUrls(baseUrls: Record<string, string>) {
			_defaults.baseUrls = merge(_defaults.baseUrls, baseUrls);
			return provider;
		},
		setDefaultRequestOptions(requestOptions: TRequestOptions) {
			_defaults.requestOptions = _defaults.requestOptions.merge(requestOptions);
			return provider;
		},
	}

	return provider;
}