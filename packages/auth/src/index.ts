import OidcResponseMode from './model/OidcResponseMode';

export { createAuthService } from './services/createAuthService';

export enum AuthRequestType {
	credentials,
	oauth,
	oauthCallback
}

export const isCredentials = (auth: Authenticate): auth is Credentials => (
	auth.type === AuthRequestType.credentials
)

export const isOAuth = (auth: Authenticate): auth is OAuth => (
	auth.type === AuthRequestType.oauth
)

export const isOAuthCallback = (auth: Authenticate): auth is OAuthCallback=> (
	auth.type === AuthRequestType.oauthCallback
)

export declare type AuthContext = {
	provider?: string;
	username?: string;
	claims?: Record<string, string>;
	oauthState?: Record<string, string>;
	redirectUrl?: string;
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

export declare interface IAuthService {
	login(authenticate: Authenticate): Promise<AuthContext>;
	logout(authenticate: Authenticate): Promise<AuthContext>;
}

export declare type AuthConfig = {
	providers: Record<string, AuthProvider>;
}

export declare type AuthProvider = {
	oidc: {
		responseMode?: OidcResponseMode;
		callbackUrl?: string;
		initiateLoginUrl?: string;
		loginCallbackUrl?: string;
	},
	returnUrl?: string;
}