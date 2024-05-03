import { IHttpService, getContentTypeHeader } from '@ui-framework/http';
import { isEmpty } from '@ui-framework/utils';
import { IResourceProvider, FileResource, ResourceType, UmdResource } from './';
import { Container } from '@ui-framework/ioc/.';

export async function createResourceProvider(container: Container): Promise<IResourceProvider> {
	const http = await container.resolve<IHttpService>('IHttpService');

	const umds: { [url: string]: UmdResource } = {};
	const files: { [url: string]: FileResource } = {};

	// TODO: Move Promise generic parameter to a type for reuse.
	async function loadFile(url: string): Promise<FileResource> {
		files[url] = files[url] ||
			new Promise((resolve, reject) => {
				if (!isEmpty(files[url])) {
					resolve(files[url]);
				} else {
					http
						.get<null, Blob>(url)
						.then((response) => {
							const data = response.data ?? new Blob();
							const objectUrl = URL.createObjectURL(data);
							const mimeType = getContentTypeHeader(response.response ?? new Response());

							files[url] = {
								data,
								objectUrl,
								url,
								mimeType,
								type: ResourceType.file
							};

							resolve(files[url]);
						})
						.catch((err) => {
							delete files[url];
							reject(err);
						});
				}
			});

		return files[url];
	}

	async function loadUmd(url: string): Promise<UmdResource> {
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
				umds[name] = {
					data: window[name],
					script,
					type: ResourceType.umd,
					url
				};
				resolve(window[name]);
			});
			script.addEventListener(`error`, (err) => {
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
		loadFile,
		loadUmd,
		flush
	}
}
