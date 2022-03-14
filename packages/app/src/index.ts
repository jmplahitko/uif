import { IHttpProvider } from '@ui-framework/http';
import { createAppHost, Platform, ISettingsProvider } from '@ui-framework/core';

import { helloWorld } from './splash/helloWorld';
import { iCanHazDadJoke } from './ready/http/get/iCanHazDadJoke';

createAppHost('#app', { debug: true }).then(app => {
	// app.module();
	app
		.splash(helloWorld)
		.configure((httpProvider: IHttpProvider) => {
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
		}, ['IHttpProvider'])
		.configure((platform: Platform) => {
			console.log(platform);
		}, ['Platform'])
		.configure((settingsProvider: ISettingsProvider) => {
			console.log(settingsProvider);
		}, ['ISettingsProvider'])
		.ready(iCanHazDadJoke, ['IHttpService'])
		.start();
});