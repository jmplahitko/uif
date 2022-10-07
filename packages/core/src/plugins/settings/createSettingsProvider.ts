import { IHttpService } from '@ui-framework/http';
import { IAppSettings, IStartupOptions } from '../..';
import { ISettingsProvider } from '.';

export const factory = (options: IStartupOptions) => {
	createSettingsProvider.$inject = ['IHttpService'];
	async function createSettingsProvider(httpService: IHttpService): Promise<ISettingsProvider> {
		const debug = __DEBUG__;
		const settingsUrl = options.settings?.settingsUrl || 'settings.json';
		let appSettings: IAppSettings = {};

		await httpService.get(settingsUrl).then(({ data }) => {
			Object.assign(appSettings, data);
		});

		const provider = {
			debug,
			appSettings,
			addSetting(name: keyof IAppSettings, settings: any): ISettingsProvider {
				Object.assign(appSettings, { [name]: settings });

				return provider;
			}
		}

		return provider;
	}

	return createSettingsProvider;
}