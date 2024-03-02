export { factory as createSettingsProvider } from './createSettingsProvider';
export { settingsFactory } from './settingsFactory';

export declare type SettingsOptions = {
	settingsUrl?: string;
}

export interface ISettingsProvider {
	readonly debug: boolean;
	readonly appSettings: IAppSettings;
	addSetting(name: keyof IAppSettings, value: any): this;
}