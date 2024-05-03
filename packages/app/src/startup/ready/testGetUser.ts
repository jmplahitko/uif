import { ready } from '@ui-framework/core/startup';
import { IHttpRequestFactory } from '@ui-framework/core/http';
import { IHttpService } from '@ui-framework/http';
import { GetUser } from '../../model/users/exchange/GetUser';
import { GetUserResponse } from '../../model/users/exchange/GetUserResponse';

testGetUser.$inject = ['IHttpRequestFactory', 'IHttpService'];
async function testGetUser({ create }: IHttpRequestFactory, service: IHttpService) {
	const getUser = create([GetUser, GetUserResponse]);

	if (getUser) {
		const response = await getUser({ id: 1, test: 'query' })
			// const response = await service.get('api/users/1')
			.catch(e => {
				console.log(e)
			})

		console.log(response);
	}
}

ready(testGetUser);