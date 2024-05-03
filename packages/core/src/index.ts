import { Observable } from '@ui-framework/observable/dist/types';
import { SettingsOptions } from './settings';

declare global {
	interface IStartupOptions {
		settings?: SettingsOptions;
	}

	interface IAppSettings {

	}
}

export declare interface IObservable<T extends object> {
	observe: Observable<T>['observe'];
	observeOnce: Observable<T>['observeOnce'];
}
