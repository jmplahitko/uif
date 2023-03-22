
export class Authenticate {
	accessToken?: string;
	authorizationVerifier?: string;
	requireLogin?: boolean;
	password?: string;
	provider?: string;
	returnUrl?: string;
	rememberMe?: boolean;
	state?: Record<string, string>; // TODO: Need an explicit mapping converter
	username?: string;
}

export class AuthenticateDto {
	accessToken?: string;
	authorizationVerifier?: string;
	requireLogin?: boolean;
	password?: string;
	returnUrl?: string;
	rememberMe?: boolean;
	state?: Record<string, string>; // TODO: Need an explicit mapping converter
	username?: string;
}

export class AuthenticateResponse {
	claims!: Record<string, any>;
	provider!: string;
	redirectUrl?: string;
	state?: Record<string, string>;
}

export class AuthenticateResponseDto {
	claims!: Record<string, any>;
	provider!: string;
	redirectUrl?: string;
	state?: Record<string, string>;
}