import { copy } from '@ui-framework/utils';

import { register as constant } from './constants';
import { register as provider } from './providers';
import { register as service } from './services';
import { init as configure } from './configurations';
import { init as ready } from './ready';

// TODO: leave these behind if they aren't needed
import {
	createHttpProvider,
	httpServiceFactory,
	createHttpRequestFactory
} from '../http';
import {
	createSettingsProvider,
	settingsFactory
} from '../settings';
import {
	createResourceProvider
} from '../resources';

let started = false;

export async function start(options: IStartupOptions) {
	constant('IStartupOptions', () => copy(options));
	constant('IAppSettings', settingsFactory);

	provider('ISettingsProvider', createSettingsProvider(options));
	provider('IHttpProvider', createHttpProvider);
	provider('IHttpService', httpServiceFactory);
	provider('IHttpRequestFactory', createHttpRequestFactory);
	provider('IResourceProvider', createResourceProvider);

	return new Promise(async (resolve, reject) => {
		try {
			await configure();
			await ready();

			started = true;
			resolve(null);
		} catch (e) {
			// TODO
			console.log(e);
			reject(e);
		}
	});
}

export const hasStarted = () => started;

export const startupComplete = async () => {
	await waitFor(hasStarted);


	Promise.resolve(started);
};

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

/**
 * Waits for the test function to return a truthy value
 * example usage:
 *    wait for an element to exist, then save it to a variable
 *        let el = await waitFor(() => document.querySelector('#el_id')))
 *    timeout_ms and frequency are optional parameters
 */
async function waitFor(test, timeout_ms = 20 * 1000, frequency = 200) {
	if (typeof (test) != "function") throw new Error("test should be a function in waitFor(test, [timeout_ms], [frequency])")
	if (typeof (timeout_ms) != "number") throw new Error("timeout argument should be a number in waitFor(test, [timeout_ms], [frequency])");
	if (typeof (frequency) != "number") throw new Error("frequency argument should be a number in waitFor(test, [timeout_ms], [frequency])");
	let logPassed = () => console.log('Passed: ', test);
	let logTimedout = () => console.log('%c' + 'Timeout : ' + test, 'color:#cc2900');
	let last = Date.now();
	let logWaiting = () => {
		if (Date.now() - last > 1000) {
			last = Date.now();
			console.log('%c' + 'waiting for: ' + test, 'color:#809fff');
		}
	}

	let endTime = Date.now() + timeout_ms;
	let isNotTruthy = (val) => val === undefined || val === false || val === null || val.length === 0; // for non arrays, length is undefined, so != 0    
	let result = test();
	while (isNotTruthy(result)) {
		if (Date.now() > endTime) {
			logTimedout();
			return false;
		}
		logWaiting();
		await sleep(frequency);
		result = test();
	}
	logPassed();
	return result;
}
