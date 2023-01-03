import { IPlugin } from '../..';
import { createRouterProvider } from './createRouterProvider';

export function createRouterPlugin(options: IStartupOptions): IPlugin {
	return {
		name: 'router',
		inject({ providers }) {
			providers.set('IRouterProvider', createRouterProvider(options));
		}
	}
}