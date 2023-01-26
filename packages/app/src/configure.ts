import { IHttpProvider } from '@ui-framework/core/http';
import { HttpMethod } from '@ui-framework/http';
import { GetUser } from './model/users/exchange/GetUser';
import { GetUserResponse } from './model/users/exchange/GetUserResponse';

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
	httpProvider.routes.set
		.get([GetUser, GetUserResponse], '/users/:id', {
			onRequest(details, next) {
				console.log(details);
				next(details);
			},
			onResponse(details, next) {
				console.log(details);
				next(details);
			}
		});


	httpProvider.interceptors.add({
		onRequest(requestDetails, next, resolve, reject) {
			console.log('Request pipe:', requestDetails);
			next(requestDetails);
		},
		onResponse(responseDetails, next, resolve, reject) {
			console.log('Response pipe:', responseDetails);
			next(responseDetails);
			// reject(responseDetails);
		}
	});
	console.log(httpProvider);
}