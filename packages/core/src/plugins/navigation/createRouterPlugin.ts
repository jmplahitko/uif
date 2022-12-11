import { createRouterProvider } from './createRouterProvider';

export function createRouterPlugin(options: uif.IStartupOptions): uif.IPlugin {
	return {
		name: 'router',
		inject({ providers }) {
			providers.set('IRouterProvider', createRouterProvider(options));
		}
	}
}