import { register as constant } from './constants';
import { register as provider } from './providers';
import { register as service } from './services';
import { init as configure } from './configurations';
import { init as ready } from './ready';
import { copy } from '@ui-framework/utils';

import {
	createHttpProvider,
	httpServiceFactory,
	createHttpRequestFactory
} from '../http';
import { createSettingsProvider, settingsFactory } from '../settings';

let started = false;

export async function start(options: IStartupOptions) {
	constant('IStartupOptions', () => copy(options));
	constant('IAppSettings', settingsFactory);

	provider('ISettingsProvider', createSettingsProvider(options));
	provider('IHttpProvider', createHttpProvider);
	provider('IHttpService', httpServiceFactory);
	provider('IHttpRequestFactory', createHttpRequestFactory);

	return new Promise(async (resolve, reject) => {
		try {
			// TODO - we don't want start to be called more than once.
			if (started) return reject();
			else started = true;

			await configure();
			await ready();

			resolve(null);
		} catch (e) {
			// TODO
			console.log(e);
			reject(e);
		}
	});
}