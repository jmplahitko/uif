import { IObservable } from '@ui-framework/core';

export { createAuthProvider } from './services/createAuthProvider';

export const isCredentials = (auth: Authenticate): auth is Credentials => (
	auth.type === AuthRequestType.credentials
)

export const isOAuth = (auth: Authenticate): auth is OAuth => (
	auth.type === AuthRequestType.oauth
)

export const isOAuthCallback = (auth: Authenticate): auth is OAuthCallback=> (
	auth.type === AuthRequestType.oauthCallback
)

export declare interface IAuthProvider {
	login(authenticate: Authenticate): Promise<AuthContext>;
	logout(authenticate: Authenticate): Promise<AuthContext>;
}

export declare type AuthContext = {
	provider?: string;
	username?: string;
	claims?: Record<string, string>;
	oauthState?: Record<string, string>;
	redirectUrl?: string;
}

// export declare type AuthState = {
// 	context: AuthContext;
// }

export enum AuthRequestType {
	credentials,
	oauth,
	oauthCallback
}

export declare type Credentials = {
	type: AuthRequestType.credentials;
	provider?: string,
	password: string;
	rememberMe?: boolean;
	username: string;
}

export declare type OAuth = {
	type: AuthRequestType.oauth;
	provider: string;
	requireLogin?: boolean;
	returnUrl: string;
	state?: Record<string, string>; // TODO: Need an explicit mapping converter
}

export declare type OAuthCallback = {
	type: AuthRequestType.oauthCallback;
	provider: string;
	accessToken?: string;
	authorizationVerifier?: string;
}

export declare type Authenticate = {
	type: AuthRequestType
} & OAuth
	| OAuthCallback
	| Credentials;