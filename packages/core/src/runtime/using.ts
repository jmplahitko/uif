import { Container, ServiceKey } from '@ui-framework/ioc/.';
import { isString } from '@ui-framework/utils';
import { services } from '../containers';
import { IResourceProvider, ResourceType, FileResource, UmdResource } from '../resources';
import { start } from '../startup';
import { startupComplete } from '../startup/start';

export declare type UsingFileResourceOptions = {
	resourceType: ResourceType.file
}

export declare type UsingUmdResourceOptions = {
	resourceType: ResourceType.umd
}

export declare type UsingOptions = {
	resourceType: ResourceType;
} | UsingFileResourceOptions
	| UsingUmdResourceOptions

export declare type VUsingOptions<T> = T extends FileResource
	? UsingFileResourceOptions
	: T extends UmdResource
	? UsingUmdResourceOptions
	: void;

export default async function using<T>(key: ServiceKey, opts: VUsingOptions<T> | void): Promise<T | never> {
	const completed = await startupComplete();

	const resourceProvider = await services.resolve<IResourceProvider>('IResourceProvider');

	switch (opts?.resourceType) {
		case ResourceType.file:
			if (isString(key)) {
				return resourceProvider.loadFile(key) as unknown as T;
			}
		case ResourceType.umd:
			if (isString(key)) {
				return resourceProvider.loadUmd(key) as unknown as T;
			}
		default:
			return services.resolve<T>(key);
	}
}