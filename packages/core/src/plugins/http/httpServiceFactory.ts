import { IHttpService } from '@ui-framework/http';
import { createHttpService } from '@ui-framework/http/fetch';
import { IHttpProvider } from '.';

httpServiceFactory.$inject = ['IHttpProvider'];
export function httpServiceFactory(provider: IHttpProvider): IHttpService {
	return createHttpService({
		defaultRequestOptions: provider.defaults.requestOptions,
		interceptors: provider.interceptors.get()
	});
}