import ResponseContentType from '../ResponseContentType';

export default function jsonParsingStrategy(response: Response): Promise<any> {
	return new Promise((resolve, reject) => {
		try {
			response.json().then(json => {
				resolve(json);
			})
			.catch((e) => {
				reject(e);
			});
		} catch(e) {
			reject(e);
		}
	});
}

jsonParsingStrategy.type = ResponseContentType.json;