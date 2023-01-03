import { IRouterProvider, RouterMiddlewareType } from '@ui-framework/core/navigation';
import { IHttpProvider } from '@ui-framework/core/http';

goodConfiguration.$inject = ['ISettingsProvider'];
export function goodConfiguration(settingsProvider) {
	console.log('settingsProvider', settingsProvider);
}

badConfiguration.$inject = ['IAppSettings'];
export function badConfiguration(settings) {
	console.log('settings', settings);
}

httpConfiguration.$inject = ['IHttpProvider'];
export function httpConfiguration(httpProvider: IHttpProvider) {
	httpProvider.addInterceptors((interceptors) => {
		interceptors.push({
			onRequest(requestDetails, next, resolve, reject) {
				console.log('Request pipe:', requestDetails);
				next(requestDetails);
			},
			onResponse(responseDetails, next, resolve, reject) {
				console.log('Response pipe:', responseDetails);
				next(responseDetails);
				// reject(responseDetails);
			}
		})
	})
	console.log(httpProvider);
}

routerConfiguration.$inject = ['IRouterProvider'];
export function routerConfiguration(routerProvider: IRouterProvider) {
	console.log(routerProvider.defaults);

	const { routes, middlewares } = routerProvider;

	middlewares.add({
		type: RouterMiddlewareType.onEnter,
		middleware: () => (to, from) => {
			console.log(to, from);
			return Promise.resolve();
		}
	});

	routes.add({
		name: 'home',
		path: '/',
		beforeEnter: () => (to, from) => {
			console.log(to, from);
			return Promise.resolve();
		},
	});

	routerProvider

	console.log(routerProvider.routes.get());
}