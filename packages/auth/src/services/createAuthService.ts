import { AuthRequestType, Authenticate, Credentials, IAuthProvider, OAuth } from '..';


createAuthService.$inject = ['IAuthProvider', 'IHttpService'];
export async function createAuthService(provider: IAuthProvider) {

	// const creds: Authenticate = {
	// 	type: AuthRequestType.credentials,
	// 	provider: 'credentials',
	// 	username: '',
	// 	password: ''
	// }

	// const oauth: Authenticate = {
	// 	type: AuthRequestType.oauth,
	// 	provider: 'access-indiana',
	// 	returnUrl: '',
	// 	state: {},
	// }

	// const oauthCallback: Authenticate = {
	// 	type: AuthRequestType.oauthCallback,
	// 	// provider: 'access-indiana',
	// 	// authorizationVerifier: '',
	// 	// accessToken: '',
	// 	provider: '',
	// 	// username: ''
	// }

	// const ctx = await provider.login(creds);

	// if (isCredentialsContext(ctx)) {
	// 	ctx.username;
	// 	ctx.provider;
	// 	ctx.type;
	// } else if (isOAuthContext(ctx)) {
	// 	ctx.claims;
	// 	ctx.oauthState;
	// 	ctx.provider
	// 	ctx.type;
	// } else if (isOAuthRedirectContext(ctx)) {
	// 	ctx.provider;
	// 	ctx.redirectUrl;
	// 	ctx.type;
	// } else {
	// 	ctx.provider;
	// 	ctx.type
	// }

	return {}
}