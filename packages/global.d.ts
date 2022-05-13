var __DEBUG__: boolean;

// This stuff needs to be moved to Types package when it's created.

declare type Selector<T, P = any> = (obj: T) => P;
declare type Static<T> = { new (...args: any[]): T };