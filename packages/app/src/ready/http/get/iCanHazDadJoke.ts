import { HttpMethod, IHttpService } from '@ui-framework/http';
import { RequestMode} from '@ui-framework/http/fetch';

iCanHazDadJoke.$inject = ['IHttpService'];
export async function iCanHazDadJoke(httpService: IHttpService) {
	const url = 'https://icanhazdadjoke.com/';

		const result1 = await httpService<void, any>({
			url,
			method: HttpMethod.get,
			options: {
				mode: RequestMode.cors,
			}
		}).catch(e => {
			console.log(new Error(e))
		});

		const result2 = await httpService.get<any>(url, {
			mode: RequestMode.cors,
		}).catch(e => {
			console.log(new Error(JSON.stringify(e)))
		});

		console.log(result1, result2);
}