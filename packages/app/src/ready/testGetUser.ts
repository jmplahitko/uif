import { IHttpRequestFactory } from '@ui-framework/core/http';
import { GetUser } from '../model/users/exchange/GetUser';
import { GetUserResponse } from '../model/users/exchange/GetUserResponse';

testGetUser.$inject = ['IHttpRequestFactory'];
export async function testGetUser({ create }: IHttpRequestFactory) {
	const getUser = create([GetUser, GetUserResponse]);

	if (getUser) {
		const response = await getUser({ id: 1, test: 'query' });
	}
}