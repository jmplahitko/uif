import { IAppSettings } from './IAppSettings';
import { ISettingsProvider } from './ISettingsProvider';

export class SettingsProvider implements ISettingsProvider {
	private _debug: boolean = false;
	private _appSettings: IAppSettings = {};

	constructor(debug: boolean) {
		this._debug = debug;
	}

	get debug() {
		return this._debug;
	}

	get appSettings() {
		return this._appSettings;
	}

	public addSetting(name: keyof IAppSettings, settings: any): this {
		let appSettings = this._appSettings;

		this._appSettings = Object.assign({}, appSettings, { [name]: settings });

		return this;
	}

	public removeSetting(name: keyof IAppSettings): this {
		let appSettings = this._appSettings;

		if (appSettings.hasOwnProperty(name)) {
			delete appSettings[name];
		}

		return this;
	}
}