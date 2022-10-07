import { ISettingsProvider } from '.';
import { IAppSettings } from '../..';

export type Settings = {
	debug: boolean;
	appSettings: IAppSettings;
}

settingsFactory.$inject = ['ISettingsProvider'];
export function settingsFactory(provider: ISettingsProvider): Settings {
	return {
		debug: provider.debug,
		appSettings: provider.appSettings,
	};
}