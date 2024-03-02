import { Observable } from '@ui-framework/observable/dist/types';
import { SettingsOptions } from './settings';

export { register as configure } from './startup/configurations'
export { register as constant } from './startup/constants';
export { register as provider } from './startup/providers';
export { register as ready } from './startup/ready';
export { register as service } from './startup/services';
export { start } from './startup/start';
export { use } from './containers';

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
