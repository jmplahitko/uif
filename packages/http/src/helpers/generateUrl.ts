import { compilePath, isUrl, matchPath, prune } from '@ui-framework/utils';
import { HttpMethod, simpleHttpMethods } from '../HttpMethod';
import { createQueryString } from './createQueryString';

export function generateUrl(url: string, method: HttpMethod, data: Record<string, any> = {}) {
	let queryString;
	let compiledUrl = compilePath(url, data);

	if (simpleHttpMethods.includes(method)) {
		const usedTokens = matchPath(url, compiledUrl);
		const unusedTokens = prune(data, ...Object.keys(usedTokens))
		queryString = createQueryString(unusedTokens);
		url = `${url}${queryString}`;
	}

	return url;
}