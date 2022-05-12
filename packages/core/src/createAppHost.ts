import { IModule } from './modules/IModule';
import { IAppHost } from './IAppHost';
import {
	CreateAppOptions,
	ready,
	registerConfiguration,
	registerModule,
	registerPlugin,
	registerReadyCallback,
	start
 } from './startup';
import { InjectableFactory } from '@ui-framework/ioc';
import { IPlugin } from './plugins/IPlugin';

let started = false;

export function createAppHost(options: CreateAppOptions): IAppHost {
	const hostEl: HTMLElement | null = document.querySelector(options.el);
	if (hostEl === null) {
		throw new ReferenceError(`[app]: Host Element "${options.el}" couldn't be found.`);
	} else {
		try {
			if (options.splash) {
				options.splash(hostEl)
			}
		} catch (e) {
			console.log(e);
		}
	}

	const appHost = {
		configure(configuration: InjectableFactory<any>) {
			registerConfiguration(configuration);
		},

		module<T>(module: IModule<T>) {
			registerModule(module);
		},

		plugin(plugin: IPlugin) {
			registerPlugin(plugin);
		},

		ready(readyCallback: InjectableFactory<any>) {
			registerReadyCallback(readyCallback);
		},

		async start() {
			return new Promise(async (resolve, reject) => {
				if (started) {
					// TODO - we don't want start to be called more than once.
					reject();
				} else {
					started = true;
					resolve(start(options));
				}
			});
		},
	};

	return appHost;
}