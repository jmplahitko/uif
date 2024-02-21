
export type ImageResource = {
	blob: Blob;
	objectUrl: string;
	url: string
}

export type UmdResource<T> = {
	resource: T;
	script: HTMLScriptElement;
	url: string
}

export declare interface IResourceProvider {
	loadImage(url: string): Promise<ImageResource>;
	loadUmd<T>(url: string): Promise<UmdResource<T>>;
	flush(): void;
}