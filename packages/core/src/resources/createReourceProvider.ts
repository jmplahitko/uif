import { IHttpService } from '@ui-framework/http';
import { isEmpty } from '@ui-framework/utils';
import { IResourceProvider, ImageResource, UmdResource } from '.';

export function createResourceProvider(http: IHttpService): IResourceProvider {
	const umds: { [url: string]: UmdResource<unknown> } = {};
	const images: { [url: string]: ImageResource } = {};

	// TODO: Move Promise generic parameter to a type for reuse.
	async function loadImage(url: string): Promise<ImageResource> {
		images[url] = images[url] ||
			new Promise((resolve, reject) => {
				if (!isEmpty(images[url])) {
					resolve(images[url]);
				} else {
					http
						.get<null, Blob>(url)
						.then((response) => {
							const blob = response.data ?? new Blob();
							const objectUrl = URL.createObjectURL(blob);
							resolve({ blob, objectUrl, url });
						})
						.catch((err) => {
							delete images[url];
							reject(err);
						});
				}
			});

		return images[url];
	}

	async function loadUmd<T>(url: string): Promise<UmdResource<T>> {
		const fileNameSegment = url
			.split(`/`)
			.reverse()[0]
			.match(/^(.*?)\.umd/);
		let name: string;

		if (fileNameSegment) name = fileNameSegment[1];
		else {
			throw new Error(`{ResourceCache} - Could not parse provided ${url}.`);
		}

		if (window[name]) return window[name];

		// this._logger.info(`{ResourceCache} - Loading ${url}...`);
		// @ts-ignore
		window[name] = new Promise((resolve, reject) => {
			const script = document.createElement(`script`);
			script.async = true;
			script.addEventListener(`load`, () => {
				umds[name] = { resource: window[name], script, url };
				// this._logger.log(`{ResourceCache} - ${url} loaded!`);
				resolve(window[name]);
			});
			script.addEventListener(`error`, (err) => {
				// this._logger.error(`{ResourceCache} - Failed to load ${url}`, err);
				document.head.removeChild(script);
				delete window[name];
				reject(err);
			});
			script.src = url;
			document.head.appendChild(script);
		});

		return window[name];
	}

	function flush() {
		for (let name in umds) {
			const entry = umds[name];
			document.head.removeChild(entry.script);
			delete window[name];
			delete umds[name];
		}
	}

	return {
		loadImage,
		loadUmd,
		flush
	}
}
