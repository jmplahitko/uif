import { Settings } from './index';
import { ISettingsProvider } from './ISettingsProvider';

settingsFactory.$inject = ['ISettingsProvider'];
export function settingsFactory(provider: ISettingsProvider): Settings {
	return {
		debug: provider.debug,
		appSettings: provider.appSettings,
	};
}