import { compilePath, isUrl, matchPath, prune } from '@ui-framework/utils';
import { HttpMethod, simpleHttpMethods } from '../HttpMethod';
import { createQueryString } from './createQueryString';

export function generateUrl(url: string, method: HttpMethod, data: Record<string, any> = {}) {
	let queryString;
	let base = '';
	let pathToParse = url;

	if (isUrl(url)) {
		const _url = new URL(url);
		base = `${_url.protocol}//${_url.host}`;
		pathToParse = _url.pathname;
	}

	const compiledUrl = compilePath(pathToParse, data);

	if (simpleHttpMethods.includes(method)) {
		const usedTokens = matchPath(pathToParse, compiledUrl);
		const unusedTokens = prune(data, ...Object.keys(usedTokens))
		queryString = createQueryString(unusedTokens);
		url = `${pathToParse}${queryString}`;
	}

	url = `${base}${url}`;

	return url;
}