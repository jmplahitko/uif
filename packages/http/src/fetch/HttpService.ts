import 'abortcontroller-polyfill';

import { RequestDetails, ResponseDetails } from '../index';
import { HttpMethod, simpleHttpMethods } from '../HttpMethod';
import { IHttpService } from '../IHttpService';
import { prepareResponseDetails } from './helpers/prepareResponseDetails';

import CancellablePromise from './CancellablePromise';
import RequestOptions, { TRequestOptions } from './RequestOptions';
import { createPipe, isBufferArray, isBlob, isFormData, isURLSearchParams, isUndefined } from '@ui-framework/utils';
import { ResponseParsingStrategyFactory } from './responseParsingStrategies';
import { generateUrl } from '../helpers/generateUrl';

function isJSONRequest(data: any): boolean {
	return !isBufferArray(data) && !isBlob(data) && !isFormData(data) && !isURLSearchParams(data);
}

export function createHttpService({ defaultRequestOptions, interceptors }): IHttpService {
	const responseParsingStrategyFactory = new ResponseParsingStrategyFactory();
	const prepareResponse = prepareResponseDetails(responseParsingStrategyFactory);

	function http<T, U>(requestDetails: RequestDetails<T>): CancellablePromise<ResponseDetails<T, U>> {
		requestDetails.url = generateUrl(requestDetails.url, requestDetails.method);

		const abortController = new AbortController();
		let responseDetails: ResponseDetails<T, U>;
		// @ts-ignore - we know the array will only contain middlewares and not undefined, but ts doesn't.
		const requestInterceptors: Array<Operator<TRequestDetails<any>>> = interceptors
			.filter(x => !isUndefined(x.onRequest))
			.map(x => x.onRequest?.bind(x));
		// @ts-ignore - we know the array will only contain middlewares and not undefined, but ts doesn't.
		const responseInterceptors: Array<Operator<TResponseDetails<any, any>>> = interceptors
			.filter(x => !isUndefined(x.onResponse))
			.map(x => x.onResponse?.bind(x))
			.reverse();

		const runRequestInterceptors = createPipe<RequestDetails<any>>(requestInterceptors);
		const runResponseInterceptors = createPipe<ResponseDetails<any, any>>(responseInterceptors);

		const cancellablePromise = new CancellablePromise(async (resolve, reject) => {

			try {
				const options = requestDetails.options
					? new RequestOptions(requestDetails.options)
					: defaultRequestOptions;
				const shouldStringifyData = isJSONRequest(requestDetails.data);

				options.signal = abortController.signal;

				requestDetails = await runRequestInterceptors(requestDetails);

				// If we're making a request that may have a body, we need to stringify it
				// before fetching.
				if (!simpleHttpMethods.includes(requestDetails.method)) {
					if (shouldStringifyData) {
						options.body = JSON.stringify(requestDetails.data ?? {});
					} else {
						options.body = requestDetails.data;
						options.headers.delete('content-type');
					}
				}

				const request = new Request(requestDetails.url, options);

				const fetchResult = await fetch(request);
				responseDetails = await prepareResponse<T, U>(requestDetails, fetchResult, options.responseContentType);
				responseDetails = await runResponseInterceptors(responseDetails);

				if (fetchResult.ok) {
					resolve(responseDetails);
				} else {
					reject(responseDetails);
				}
			} catch (e: any) {
				responseDetails = await prepareResponse<T, U>(requestDetails);
				responseDetails.error = e instanceof Error
					? e
					: new Error(e.toString());

				reject(responseDetails);
			}
		});

		cancellablePromise.abortController = abortController;

		return cancellablePromise;
	}

	http.connect = () => { return Promise.reject(new EvalError('Method Not Implemented')); };
	// simple requests
	http.get = shorthandRequestMethod(HttpMethod.get);
	http.head = shorthandRequestMethod(HttpMethod.head);
	http.options = shorthandRequestMethod(HttpMethod.options);
	http.delete = shorthandRequestMethod(HttpMethod.delete);
	// requests with bodies
	http.patch = shorthandRequestMethodWithBody(HttpMethod.patch);
	http.post = shorthandRequestMethodWithBody(HttpMethod.post);
	http.put = shorthandRequestMethodWithBody(HttpMethod.put);

	function shorthandRequestMethod(method: HttpMethod) {
		return function <T, U>(url: string, data?: T, options?: TRequestOptions) {
			return http<T, U>({
				data,
				method,
				options,
				url
			});
		}
	}

	function shorthandRequestMethodWithBody(method: HttpMethod) {
		return function <T, U>(url: string, data: T, options?: TRequestOptions) {
			return http<T, U>({
				data,
				method,
				options,
				url
			});
		}
	}

	return http;
}