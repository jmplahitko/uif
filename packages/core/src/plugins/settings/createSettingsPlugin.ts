import { IPlugin } from '../..';
import { factory as settingsProviderFactory } from './createSettingsProvider';
import { settingsFactory } from './settingsFactory';

export function createSettingsPlugin(options: IStartupOptions): IPlugin {
	return {
		name: 'settings',
		inject({ providers, constants }) {
			providers.set('ISettingsProvider', settingsProviderFactory(options));
			constants.set('IAppSettings', settingsFactory);
		}
	}
}