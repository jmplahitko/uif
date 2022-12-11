import { createHttpRequestFactory } from './createHttpRequestFactory';
import { createHttpProvider } from './createHttpProvider';
import { httpServiceFactory } from './httpServiceFactory';

export function createHttpPlugin(): uif.IPlugin {
	return {
		name: 'http',
		inject({ providers }) {
			providers.set('IHttpProvider', createHttpProvider);
			// setting these as a providers bc they should be available to everyone.
			providers.set('IHttpService', httpServiceFactory);
			providers.set('IHttpRequestFactory', createHttpRequestFactory);
		}
	}
}