import ResponseContentType from '../ResponseContentType';

export default function blobParsingStrategy(response: Response): Promise<Blob> {
	return new Promise((resolve, reject) => {
		try {
			response.blob().then(blob => {
				resolve(blob);
			})
			.catch((e) => {
				reject(e);
			});
		} catch(e) {
			reject(e);
		}
	});
}

blobParsingStrategy.type = ResponseContentType.blob;