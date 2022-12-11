import { factory as settingsProviderFactory } from './createSettingsProvider';
import { settingsFactory } from './settingsFactory';

export function createSettingsPlugin(options: uif.IStartupOptions): uif.IPlugin {
	return {
		name: 'settings',
		inject({ providers, constants }) {
			providers.set('ISettingsProvider', settingsProviderFactory(options));
			constants.set('IAppSettings', settingsFactory);
		}
	}
}