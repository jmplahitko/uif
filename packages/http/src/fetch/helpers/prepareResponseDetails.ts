import { RequestDetails, ResponseDetails } from '../../index';
import ContentMimeType from '../../ContentMimeType';
import ResponseContentType from '../ResponseContentType';
import HttpError from '../../HttpError';
import HttpStatusCode from '../../HttpStatusCode';
import { IResponseParsingStrategyFactory } from '../responseParsingStrategies/IResponseParsingStrategyFactory';

export const prepareResponseDetails = (responseParsingStrategyFactory: IResponseParsingStrategyFactory) => <T, U>(request: RequestDetails<T>, response?: Response, responseContentType?: ResponseContentType): Promise<ResponseDetails<T, U>> => {
	if (response) {
		const responseClone = response.clone();
		const mimeType = response.headers.has('Content-Type')
			? (response.headers.get('Content-Type') as string).split(';')[0]
			: ContentMimeType.textualDefault;
		const fallbackResponseParsingStrategy = responseParsingStrategyFactory.getStrategyFor(ResponseContentType.default);
		let strategy = responseContentType
			? responseParsingStrategyFactory.getStrategyFor(responseContentType)
			: responseParsingStrategyFactory.getStrategyByMimeType(mimeType as ContentMimeType);

		return new Promise(async (resolve, reject) => {
			let data;
			let parsedResponse: Response;
			let responseDetails: ResponseDetails<T, U>;

			try {
				data = await strategy(response);
				parsedResponse = response;
			} catch (e) {
				strategy = fallbackResponseParsingStrategy;
				try {
					data = await strategy(responseClone);
					parsedResponse = responseClone;
				} catch(e) {
					reject(e);
					return;
				}
			}

			responseDetails = {
				data,
				responseContentType: strategy.type,
				status: parsedResponse.status,
				statusText: parsedResponse.statusText,
				request,
				url: request.url
			}

			responseDetails.error = response.ok
				? undefined
				:	new HttpError({
					data: responseDetails.data,
					status: responseDetails.status,
				});

			resolve(responseDetails);
		});
	} else {
		const responseDetails = {
			data: null,
			responseContentType: ResponseContentType.default,
			status: HttpStatusCode.none,
			statusText: '',
			request,
			url: request.url
		};

		return Promise.resolve(responseDetails);
	}
}