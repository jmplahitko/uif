import ResponseContentType from '../ResponseContentType';

export default function formDataParsingStrategy(response: Response): Promise<FormData> {
	return new Promise((resolve, reject) => {
		try {
			response.formData().then(formData => {
				resolve(formData);
			})
			.catch((e) => {
				reject(e);
			});
		} catch(e) {
			reject(e);
		}
	});
}

formDataParsingStrategy.type = ResponseContentType.formData;