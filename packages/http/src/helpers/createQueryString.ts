import { isEmpty } from '@ui-framework/utils';

export function createQueryString(query: object): string {
	let queryString = Object.keys(query)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
		.join('&');

	return isEmpty(queryString)
		? queryString :
		`?${queryString}`;
}