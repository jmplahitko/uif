import { IHttpProvider } from '@ui-framework/core/http';
import { HttpMethod } from '@ui-framework/http';
import { GetUser } from './model/users/exchange/GetUser';
import { GetUserResponse } from './model/users/exchange/GetUserResponse';

configure.$inject = ['ISettingsProvider', 'IAppSettings', 'IHttpProvider'];
export function configure(settingsProvider, settings, httpProvider: IHttpProvider) {
	// console.log('settingsProvider', settingsProvider);
	// console.log('settings', settings);

	httpProvider.setBaseUrls({ '$default': 'api' })
	httpProvider.routes.set
		.get([GetUser, GetUserResponse], '/users/:id', {
			onRequest(details, next) {
				console.log('req: user', details);
				next(details);
			},
			onResponse(details, next) {
				console.log('resp: user', details);
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
			// next(responseDetails);
			reject(responseDetails);
		}
	});
	console.log(httpProvider);
}