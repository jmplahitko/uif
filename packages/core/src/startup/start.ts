import { register as constant } from './constants';
import { init as configure } from './configurations';
import { init as ready } from './ready';
import { copy } from '@ui-framework/utils';
import { usePlugin } from '../plugins/usePlugin';

import { createSettingsPlugin } from '../plugins/settings/createSettingsPlugin';
import { createHttpPlugin } from '../plugins/http/createHttpPlugin';
import { createRouterPlugin } from '../plugins/navigation/createRouterPlugin';

let started = false;

export async function start(options: uif.IStartupOptions) {
	constant('IStartupOptions', () => copy(options));

	usePlugin(createSettingsPlugin(options));
	usePlugin(createHttpPlugin());
	usePlugin(createRouterPlugin(options));

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