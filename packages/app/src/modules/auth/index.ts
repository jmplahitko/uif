import { configure, provider } from '@ui-framework/core';
import { auth } from './configure';
import { GetMeResponse } from './model/exchange/GetMe';
import { Authenticate, AuthContext, createAuthProvider } from '@ui-framework/auth';
import { IHttpService } from '@ui-framework/http';

provider('IAuthProvider', async (c) => {
	const httpService: IHttpService = await c.resolve('IHttpService');
	return createAuthProvider(httpService);
});

configure(auth);

export declare type AuthState = {
	isAuthenticated: boolean;
	user: AuthContext;
}