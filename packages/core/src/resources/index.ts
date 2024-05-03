import { ContentMimeType } from '@ui-framework/http';

export { createResourceProvider } from './createResourceProvider';

export enum ResourceType {
	file,
	umd
}

export type FileResource = {
	data: Blob;
	mimeType: ContentMimeType;
	objectUrl: string;
	type: ResourceType.file;
	url: string;
}

export type UmdResource = {
	data: unknown;
	script: HTMLScriptElement;
	type: ResourceType.umd;
	url: string;
}

export type Resource = {
	data: unknown,
	type: ResourceType;
	url: string;
} | FileResource
	| UmdResource

export declare interface IResourceProvider {
	loadFile(url: string): Promise<FileResource>;
	loadUmd<T>(url: string): Promise<UmdResource>;
	flush(): void;
}