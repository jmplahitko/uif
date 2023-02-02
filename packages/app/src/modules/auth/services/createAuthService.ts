import { IHttpRequestFactory } from '@ui-framework/core/http';
import { IAuthProvider, IAuthService } from '..';

createAuthService.$inject = ['IAuthProvider', 'IHttpRequestFactory'];
export function createAuthService(provider: IAuthProvider, requestFactory: IHttpRequestFactory): IAuthService {


	return {};
}