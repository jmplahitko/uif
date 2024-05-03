import ContentMimeType from "../ContentMimeType";

export function getContentTypeHeader(response: Response): ContentMimeType {
	return response.headers.has('Content-Type')
		? response.headers.get('Content-Type')?.split(';')[0] as ContentMimeType
		: ContentMimeType.textualDefault;
}