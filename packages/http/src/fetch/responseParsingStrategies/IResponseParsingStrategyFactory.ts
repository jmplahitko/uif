import ContentMimeType from '../../ContentMimeType';
import ResponseContentType from '../ResponseContentType';
import { IResponseParsingStrategy } from '../responseParsingStrategies/IResponseParsingStrategy';

export interface IResponseParsingStrategyFactory {
	getStrategyFor(contentType: ResponseContentType): IResponseParsingStrategy
	getStrategyByMimeType(mimeType: ContentMimeType): IResponseParsingStrategy
}