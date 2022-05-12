import { IHttpService } from '@ui-framework/http';
import { CreateAppOptions } from '.';
import { IAppSettings } from '../settings/IAppSettings';
import { ISettingsProvider } from '../settings/ISettingsProvider';

import {
	configurations,
	modules,
	plugins,
	root,
	readyCallbacks,
	services,
} from './containers';

export async function start(options: CreateAppOptions) {
	return new Promise(async (resolve, reject) => {
		try {
			const settingsUrl = options?.settingsUrl || 'settings.json';
			const [
				settingsProvider,
				httpService,
			] = await root.resolveList(['ISettingsProvider', 'IHttpService']) as [
				ISettingsProvider,
				IHttpService
			];

			const { data } = await httpService.get<IAppSettings>(settingsUrl);
			for (let key in data) {
				settingsProvider.addSetting(key as keyof IAppSettings, data[key]);
			}

			// TODO: Inject modules

			const configs = await configurations.resolveAll();
			await Promise.all(Object.values(configs));

			const readyCbs = await readyCallbacks.resolveAll();
			await Promise.all(Object.values(readyCbs));
		} catch (e) {
			// TODO
			console.log(e);
		}
	});
}