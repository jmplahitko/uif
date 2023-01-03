declare global {
	interface IStartupOptions {
		settings?: {
			settingsUrl?: string;
		};
	}
}

export interface ISettingsProvider {
	readonly debug: boolean;
	readonly appSettings: IAppSettings;
	addSetting(name: keyof IAppSettings, value: any): this;
}