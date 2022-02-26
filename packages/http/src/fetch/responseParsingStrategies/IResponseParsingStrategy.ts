import ResponseContentType from '../ResponseContentType';

export interface IResponseParsingStrategy {
	(response: Response): Promise<ResponseContentType>;
	type: ResponseContentType;
}