import { InjectableFactory } from '@ui-framework/ioc';

declare global {
	interface IStartupOptions {
		navigation?: Partial<RouterDefaults>;
	}
}

export interface Location {
  name?: string;
  path?: string;
  hash?: string;
  query?: Record<string, string | (string | null)[] | null | undefined>;
  params?: Record<string, any>;
  append?: boolean;
  replace?: boolean;
}

export enum RouterMode {
	hash = 'hash',
	history = 'history',
	abstract = 'abstract'
}

export declare type RouterDefaults = {
	mode: RouterMode;
	base: string;
}

export type RouterMiddleware<TTo, TFrom = TTo> = {
	(to: TTo, from: TFrom): Promise<void>;
}

export enum RouterMiddlewareType {
	onEnter = 1 << 0,
	onError = 1 << 1,
	onLeave = 1 << 2,
	onReady = 1 << 3,
	onResolve = 1 << 4,
}

export type RouterMiddlewareDefinition = {
	type: RouterMiddlewareType;
	middleware: InjectableFactory<RouterMiddleware<any>>;
}

export type RouterMiddlewareConfig<TTo, TFrom> = {
	type: RouterMiddlewareType,
	middleware: () => Promise<RouterMiddleware<TTo, TFrom>>
}

export interface IRouteConfig<TComponent>  {
	beforeEnter?: () => Promise<RouterMiddleware<any>>;
	caseSensitive?: boolean;
	children?: [IRouteConfig<TComponent>];
	component?: () => Promise<TComponent>;
	components?: () => Promise<Record<string, TComponent>>;
	meta?: Record<string, any>;
	name: string;
	params?: () => Record<string, any>;
	path: string;
	redirect?: Location;
};

export interface IRouteDefinition<TComponent>  {
	beforeEnter?: InjectableFactory<RouterMiddleware<any>>;
	caseSensitive?: boolean;
	children?: [IRouteDefinition<TComponent>];
	component?: InjectableFactory<TComponent>;
	components?: InjectableFactory<Record<string, TComponent>>;
	meta?: Record<string, any>;
	name: string;
	params?: () => Record<string, any>;
	path: string;
	redirect?: Location;
};

export interface IRouter<TRoute> {
  push(to: Location): Promise<TRoute>;
  replace(to: Location): Promise<TRoute>;
  go(n: number): void;
  back(): void;
  forward(): void;
}

export interface IRouterProvider {
	defaults: RouterDefaults;
	middlewares: RouterDefinitionApi<RouterMiddlewareDefinition, RouterMiddlewareConfig<any, any>[]>;
	routes: RouterDefinitionApi<IRouteDefinition<any>, IRouteConfig<any>[]>;
}

export type RouterDefinitionApi<T, U> = {
	add: (def: T) => RouterDefinitionApi<T, U>;
	get: () => U;
}