import { init as configure } from './configurations';
import { init as ready } from './ready';
import { registerConstant, root } from '../containers';
import { Lifespan, ReuseScope } from '@ui-framework/ioc';
import { copy } from '@ui-framework/utils';
import { IStartupOptions } from '..';
import { usePlugin } from '../plugins/usePlugin';

import { createSettingsPlugin } from '../plugins/settings/createSettingsPlugin';
import { createHttpPlugin } from '../plugins/http/createHttpPlugin';

let started = false;

export async function start(options: IStartupOptions) {
	registerConstant('IStartupOptions', () => copy(options));

	usePlugin(createSettingsPlugin(options));
	usePlugin(createHttpPlugin());

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