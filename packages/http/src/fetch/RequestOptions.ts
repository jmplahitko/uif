import RequestCache from './RequestCache';
import RequestCredentials from './RequestCredentials';
import RequestDestination from './RequestDestination';
import RequestMode from './RequestMode';
import RequestRedirect from './RequestRedirect';
import ResponseContentType from './ResponseContentType';
import ContentMimeType from '../ContentMimeType';
import { HttpMethod } from '../HttpMethod';

export type TRequestOptions = {
	body?: any;
	cache?: RequestCache;
	credentials?: RequestCredentials;
	destination?: RequestDestination;
	headers?: { [header: string]: string };
	method?: HttpMethod,
	mode?: RequestMode;
	signal?: AbortSignal | null;
	redirect?: RequestRedirect;
	responseContentType?: ResponseContentType;
}

const defaultHeaders = new Headers([
	['Accept', ContentMimeType.json],
	['Content-Type', ContentMimeType.json],
	['X-Requested-With', 'XMLHttpRequest']
]);

export default class RequestOptions {
	public body: any = null;
	public signal: AbortSignal | null = null
	private _cache: RequestCache = RequestCache.noCache;
	private _credentials: RequestCredentials = RequestCredentials.sameOrigin;
	private _destination: RequestDestination = RequestDestination.default;
	private _headers: Headers = new Headers(defaultHeaders);
	private _mode: RequestMode = RequestMode.cors;
	private _method: HttpMethod = HttpMethod.get;
	private _redirect: RequestRedirect = RequestRedirect.manual;
	private _responseContentType: ResponseContentType | undefined;

	constructor(options?: RequestOptions | TRequestOptions) {
		if (options) {
			this.body = options.body || null;
			this._cache = options.cache || this._cache;
			this._credentials = options.credentials || this._credentials;
			this._destination = options.destination || this._destination;
			this._headers = options.headers ? RequestOptions.mergeHeaders(this._headers, options.headers) : this._headers;
			this._mode = options.mode || this._mode;
			this._method = options.method || this._method;
			this._redirect = options.redirect || this._redirect;
			this._responseContentType = options.responseContentType || this._responseContentType;

			// Simple cors requests can only have the following headers manually set:
			// Accept, Accept-Language, Content-Language, and Content-Type (with values for ContentMimeType.urlEncodedForm or ContentMimeType.multipartForm only)
			// So, we need to remove our custom header.
			// TODO: perhaps we add a json prefix concept instead of this header to clean this out...
			if (this._mode === RequestMode.cors) {
				this._headers.delete('X-Requested-With')
			}
		};
	}

	get cache() { return this._cache; };
	get credentials() { return this._credentials; };
	get destination() { return this._destination; };
	get headers() { return this._headers; };
	get mode() { return this._mode; };
	get method() { return this._method };
	get redirect() { return this._redirect; };
	get responseContentType() { return this._responseContentType; };

	public merge(src: RequestOptions | TRequestOptions): RequestOptions {
		return RequestOptions.copy(this, src);
	}

	static mergeHeaders(dest: Headers | { [header: string]: string }, src: Headers | { [header: string]: string }): Headers {
		let destHeaders = new Headers(dest);
		let srcHeaders = new Headers(src);
		let destHeaderMap = {};

		destHeaders.forEach((val, key) => {
			if (!destHeaderMap[key]) {
				destHeaderMap[key] = [val];
			} else {
				destHeaderMap[key].push(val);
			}
		});

		srcHeaders.forEach((val, key) => {
			let destHasOwnProperty = destHeaderMap.hasOwnProperty(key);
			if (!destHasOwnProperty || (destHasOwnProperty && !destHeaderMap[key].includes(val))) {
				destHeaders.append(key, val);
			}
		});

		return destHeaders;
	}

	static copy(dest: RequestOptions | TRequestOptions, src?: RequestOptions | TRequestOptions): RequestOptions {
		let requestOptions;

		if (!src) {
			requestOptions = new RequestOptions(dest);
		} else {
			let headers;
			if (dest.headers && src.headers) {
				headers = RequestOptions.mergeHeaders(dest.headers, src.headers);
			} else if (dest.headers) {
				headers = new Headers(dest.headers);
			} else if (src.headers) {
				headers = new Headers(src.headers);
			};

			requestOptions = new RequestOptions({
				body: src.body || dest.body,
				cache: src.cache || dest.cache,
				credentials: src.credentials || dest.credentials,
				destination: src.destination || dest.destination,
				headers: headers,
				mode: src.mode || dest.mode,
				method: src.method || dest.method,
				signal: src.signal || dest.signal,
				redirect: src.redirect || dest.redirect,
				responseContentType: src.responseContentType || dest.responseContentType || undefined,
			});
		}

		return requestOptions;
	}
}