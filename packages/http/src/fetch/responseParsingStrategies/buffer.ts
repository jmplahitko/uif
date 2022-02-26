import ResponseContentType from '../ResponseContentType';

export default function arrayBufferParsingStrategy(response: Response): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		try {
			// @ts-ignore
			response.buffer().then(arrayBuffer => {
				resolve(arrayBuffer);
			})
			.catch((e) => {
				reject(e);
			});
		} catch(e) {
			reject(e);
		}
	});
}

arrayBufferParsingStrategy.type = ResponseContentType.arrayBuffer;