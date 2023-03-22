import { IHttpService } from '@ui-framework/http';
import observable from '@ui-framework/observable';
import { IAuthContext, IAuthProvider, IAuthService } from '..';
import { Authenticate, AuthenticateResponse } from '../model/Authenticate';

createAuthService.$inject = ['IAuthProvider', 'IHttpService'];
export function createAuthService(provider: IAuthProvider, http: IHttpService): IAuthService {
	const { observe, observeOnce, state } = observable<IAuthContext>({
		claims: {},
		oauthState: {},
		provider: '',
	});

	function setState(authResponse: AuthenticateResponse | null) {
		state.claims = authResponse?.claims ?? {};
		state.provider = authResponse?.provider ?? '';
		state.oauthState = authResponse?.state ?? {};
	}

	return {
		observe,
		observeOnce,
		async login(authenticate: Authenticate) {
			return new Promise((resolve, reject) => {
				const provider = authenticate.provider;
				const url = provider ? `/auth/${provider}` : '/auth'; // FIXME: don't hard-code the routes
				// TODO: Mapping

				http.post<Authenticate, AuthenticateResponse>(url, authenticate)
					.then(response => {
						if (response.data?.redirectUrl) {
							window.location.href = response.data.redirectUrl;
						}

						setState(response.data);
						resolve({ ...state });
					})
					.catch(e => {
						reject(e);
					});
			});
		},
		async logout(authenticate: Authenticate) {
			return new Promise((resolve, reject) => {
				const url = `/auth/logout`; // FIXME: don't hard-code the routes
				// TODO: Mapping

				http.post<Authenticate, AuthenticateResponse>(url, authenticate)
					.then((response) => {
						const redirectUrl = response.data?.redirectUrl;

						if (redirectUrl) {
							window.location.href = redirectUrl;
						} else {
							setState(null);
							resolve({ ...state });
						}
					})
					.catch(e => {
						reject(e);
					})
			});
		}
	}
}