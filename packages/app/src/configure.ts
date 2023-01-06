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