import { createHttpRequestFactory, HttpProvider } from '@ui-framework/http';
import { createHttpService } from '@ui-framework/http/fetch';
import { IPlugin } from '../..';

export function createHttpPlugin(): IPlugin {
	return {
		name: 'http',
		inject({ providers }) {
			providers.set('IHttpProvider', HttpProvider);
			// setting these as a providers bc they should be available to everyone.
			providers.set('IHttpService', createHttpService);
			providers.set('IHttpRequestFactory', createHttpRequestFactory);
		}
	}
}