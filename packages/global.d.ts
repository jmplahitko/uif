declare type Selector<T, P = any> = (obj: T) => P;
declare type Static<T> = { new (...args: any[]): T };