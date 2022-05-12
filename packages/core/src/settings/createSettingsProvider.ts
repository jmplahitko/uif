import { IAppSettings } from './IAppSettings';
import { ISettingsProvider } from './ISettingsProvider';

export function createSettingsProvider(): ISettingsProvider {
	const debug = __DEBUG__;
	const appSettings: IAppSettings = {};

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