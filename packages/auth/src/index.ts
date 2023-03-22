import { IObservable } from '@ui-framework/core';
import { Authenticate } from './model/Authenticate';

export declare interface IAuthProvider {}

export declare interface IAuthContext {
	claims: Record<string, string>;
	oauthState: Record<string, string>;
	provider: string;
}

export declare interface IAuthService extends IObservable<IAuthContext> {
	login(authenticate: Authenticate): Promise<IAuthContext>;
	logout(authenticate: Authenticate): Promise<IAuthContext>;
}