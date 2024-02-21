import { IHttpService } from '@ui-framework/http';
import { AuthContext, Authenticate, IAuthService } from '..';

createAuthService.$inject = ['IHttpService'];
export function createAuthService(http: IHttpService): IAuthService {
	function auth(url: string, authenticate: Authenticate) {
		return new Promise<AuthContext>((resolve, reject) => {
			http.post<Authenticate, AuthContext>(url, authenticate)
				.then(response => {
					const ctx = response.data;

					if (ctx) {
						if (ctx.redirectUrl) {
							window.location.href = ctx.redirectUrl;
						}

						resolve(ctx);
					}
				})
				.catch(e => {
					reject(e);
				});
		});
	}

	return {
		login: (authenticate: Authenticate) => auth(
			authenticate.provider ? `/auth/${authenticate.provider}` : '/auth',
			authenticate
		),
		logout: (authenticate: Authenticate) => auth(
			`/auth/logout`,
			authenticate
		)
	}
}