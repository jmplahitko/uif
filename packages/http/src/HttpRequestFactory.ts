import { baseUrlDefaultKey, HttpRequestFactoryInput, RequestDetails } from './index';
import { IHttpProvider } from './IHttpProvider';
import { IHttpRequestFactory } from './IHttpRequestFactory';
import { HttpMethod, simpleHttpMethods } from './HttpMethod';
import { compilePath, isUrl } from '@ui-framework/utils';

function createQueryString(query: Record<string, string|number>): string {
	let queryString = Object.keys(query)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
		.join('&');

	return `?${queryString}`;
}

function generateFullUrl(baseUrl: string, route: [string, HttpMethod], data: Record<string, any> = {}) {
	let queryString;
	let url = isUrl(route[0])
		? compilePath(route[0], data)
		: compilePath(`${baseUrl}${route[0]}`, data);

	/** TODO: Ensure our query params do not duplicate route params */
	if (simpleHttpMethods.includes(route[1])) {
		queryString = createQueryString(data);
		url = `${url}${queryString}`
	}

	return url;
}

export function createHttpRequestFactory(provider: IHttpProvider): IHttpRequestFactory {
	return function httpRequestFactory<T>(input: HttpRequestFactoryInput<T>): RequestDetails<T> | null {
		const route = provider.routes.get(input.model);
		let requestDetails: RequestDetails<T> | null = null;

		if (route) {
			const url = generateFullUrl(provider.defaults.baseUrls[input.options?.baseUrlKey ?? baseUrlDefaultKey], route, input.data as (Record<string, any> | undefined));
			requestDetails = {
				url,
				method: route[1],
				data: input.data,
				options: input.options?.requestOptions
			}
		}

		return requestDetails;
	}
}