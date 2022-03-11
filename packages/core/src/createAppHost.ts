import { v4 as uuid } from 'uuid';
import { ISettingsProvider } from './settings/ISettingsProvider';
import { IAppSettings } from './settings/IAppSettings';
import { IHttpService } from '@ui-framework/http';
import { IModule } from './modules/IModule';
import { IAppHost } from './IAppHost';

import { createRootContainer } from './createRootContainer';

export type CreateAppOptions = {
	debug?: boolean;
	settingsUrl?: string;
}

export async function createAppHost(domSelector: string, options?: CreateAppOptions): Promise<IAppHost> {
	const debug = options?.debug ?? false;
	const settingsUrl = options?.settingsUrl || 'settings.json';


	// TODO: This should probably be moved to a configurer.
	const rootContainer = createRootContainer(debug);

	const hostedServices = rootContainer.spawn('$$hostedServices');
	const configFns = rootContainer.spawn('$$configFns');
	const readyFns = hostedServices.spawn('$$readyFns');

	return new Promise(async (resolve, reject) => {
		const _hostEl: HTMLElement | null = document.querySelector(domSelector);

		// We need a valid host element to attach a splash page while we load the app. This will allow us to paint quickly and provide
		// user with adequate feedback.
		if (_hostEl === null) {
			const err = new ReferenceError(`[app]: Host Element "${domSelector}" couldn't be found.`);
			reject(err);
			return;
		} else {
			// TODO: Attach splash
		}

		// We try to fetch settings. For now, if we don't receive any, we fail closed.
		const settingsProvider: ISettingsProvider = await rootContainer.resolve('ISettingsProvider');
		const httpService: IHttpService = await rootContainer.resolve('IHttpService');
		// TODO: May want to fail open here?
		try {
			const { data } = await httpService.get<IAppSettings>(settingsUrl);
			for (let key in data) {
				settingsProvider.addSetting(key as keyof IAppSettings, data[key]);
			}
		} catch (err) {
			reject(err);
			return;
		}

		// At this point, we are confident we can bootstrap the app.
		const appHost: IAppHost = {

			module<T>(module: IModule<T>) {
				return appHost;
			},

			splash(factory: (el: Element) => void) {
				const domHost = document.querySelector(domSelector);

				if (domHost) {
					factory(domHost)
				}

				return appHost;
			},

			configure(configFn: (...providers: Array<any>) => void, dependencies: Array<string | symbol> = []) {
				configFns.registerFactory(uuid(), async (container) => {
					const deps = await container.resolveList(dependencies);
					return Promise.resolve(configFn(...deps));
				});

				return appHost;
			},

			ready(readyFn: (...services: Array<any>) => void, dependencies: Array<string | symbol> = []) {
				readyFns.registerFactory(uuid(), async (container) => {
					const deps = await container.resolveList(dependencies);
					return Promise.resolve(readyFn(...deps));
				});

				return appHost;
			},

			async start() {
				// TODO: Inject modules

				// Configure the app's providers
				const configs = await configFns.resolveAll();
				await Promise.all(Object.values(configs));

				// TODO: Bootstrap the app host and request the $rootEl from the container

				// Invoke ready() handlers
				const readies = await readyFns.resolveAll();
				await Promise.all(Object.values(readies));
			},
		}

		resolve(appHost);
	});
}