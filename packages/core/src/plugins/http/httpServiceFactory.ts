import { createHttpService } from '@ui-framework/http/fetch';
import { IHttpProvider } from '.';

httpServiceFactory.$inject = ['IHttpProvider'];
export function httpServiceFactory({ interceptors, defaults }: IHttpProvider) {
	return createHttpService({
		defaultRequestOptions: defaults.requestOptions,
		interceptors
	});
}