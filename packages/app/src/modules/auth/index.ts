import { configure, provider } from '@ui-framework/core';
import { createAuthService } from './services/createAuthService';
import { createAuthProvider } from './services/createAuthProvider';
import { auth } from './configure';

configure(auth);
provider('IAuthService', () => createAuthService);
provider('IAuthProvider', () => createAuthProvider);

export declare interface IAuthProvider {}
export declare interface IAuthService {}