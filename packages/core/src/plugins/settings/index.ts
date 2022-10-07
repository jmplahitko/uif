import { IAppSettings } from '../..';

export interface ISettingsProvider {
	readonly debug: boolean;
	readonly appSettings: IAppSettings;
	addSetting(name: keyof IAppSettings, value: any): this;
}