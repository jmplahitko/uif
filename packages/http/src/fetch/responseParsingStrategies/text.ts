import ResponseContentType from '../ResponseContentType';

export default function textParsingStrategy(response: Response): Promise<string> {
	return new Promise((resolve, reject) => {
		try {
			response.text().then(text => {
				resolve(text);
			})
			.catch((e) => {
				reject(e);
			});
		} catch(e) {
			reject(e);
		}
	});
}

textParsingStrategy.type = ResponseContentType.text;