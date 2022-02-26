import ResponseContentType from '../ResponseContentType';

export default function arrayBufferParsingStrategy(response: Response): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		try {
			response.arrayBuffer().then(arrayBuffer => {
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