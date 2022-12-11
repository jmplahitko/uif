declare global {
	namespace uif {
		interface IStartupOptions {
			settings?: {
				settingsUrl?: string;
			};
		}
	}
}

export interface ISettingsProvider {
	readonly debug: boolean;
	readonly appSettings: uif.IAppSettings;
	addSetting(name: keyof uif.IAppSettings, value: any): this;
}