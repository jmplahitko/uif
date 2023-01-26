import { IHttpService, RequestDetails, ResponseDetails, simpleHttpMethods } from '@ui-framework/http';
import { Container } from '@ui-framework/ioc/.';
import { compilePath, createPipe, isUrl, prune, matchPath, isEmpty } from '@ui-framework/utils';
import { baseUrlDefaultKey, IHttpProvider, IHttpRequestFactory , HttpRouteDefinition } from '.';

function createQueryString(query: object): string {
	let queryString = Object.keys(query)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
		.join('&');

	return isEmpty(queryString)
		? queryString :
		`?${queryString}`;
}

function generateFullUrl(baseUrl: string, route: HttpRouteDefinition, data: Record<string, any> = {}) {
	let queryString;
	let path = isUrl(route.url)
		? route[0]
		: `${baseUrl}${route.url}`;
	let url = compilePath(path, data)

	if (simpleHttpMethods.includes(route.method)) {
		const usedTokens = matchPath(path, url);
		const unusedTokens = prune(data, ...Object.keys(usedTokens))
		queryString = createQueryString(unusedTokens);
		url = `${url}${queryString}`;
	}

	return url;
}

export async function createHttpRequestFactory(container: Container): Promise<IHttpRequestFactory> {
	const provider: IHttpProvider = await container.resolve('IHttpProvider');
	const service: IHttpService = await container.resolve('IHttpService');

	return {
		create(key, options?) {
			type T = InstanceType<typeof key[0]>;
			type U = InstanceType<typeof key[1]>;

			const entry = provider.routes.get.entry(key) as HttpRouteDefinition<T, U>;
			let resolver: ((data: T) => Promise<ResponseDetails<T, U>>) | null = null;

			if (entry) {
				resolver = async (data: T) => {
					let { method, url, interceptor } = entry;

					url = generateFullUrl(provider.defaults.baseUrls[options?.baseUrlKey ?? baseUrlDefaultKey], entry, data as (Record<string, any> | undefined));
					let requestDetails: RequestDetails<T> = {
						url,
						method,
						data,
						options: options?.requestOptions
					}

					if (interceptor?.onRequest) {
						const pipe = createPipe([
							interceptor.onRequest.bind(interceptor)
						]);

						requestDetails = await pipe(requestDetails);
					}

					let responseDetails = await service<T, U>(requestDetails);

					if (interceptor?.onResponse) {
						const pipe = createPipe<ResponseDetails<T, U>>([
							interceptor.onResponse.bind(interceptor)
						]);

						responseDetails = await pipe(responseDetails);
					}

					return responseDetails;
				}
			}

			return resolver;
		}
	}
}