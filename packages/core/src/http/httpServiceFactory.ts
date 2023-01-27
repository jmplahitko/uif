import { IHttpService } from '@ui-framework/http';
import { createHttpService } from '@ui-framework/http/fetch';
import { Container } from '@ui-framework/ioc';
import { IHttpProvider } from '.';

export async function httpServiceFactory(container: Container): Promise<IHttpService> {
	const provider = await container.resolve<IHttpProvider>('IHttpProvider');

	return createHttpService({
		defaultRequestOptions: provider.defaults.requestOptions,
		interceptors: provider.interceptors.get()
	});
}