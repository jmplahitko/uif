export default function parseQueryString(queryString: string): Record<string, string> {
	let query: Record<string, string> = {};
	let pairs = (queryString[0] === '?'
		? queryString.substring(1)
		: queryString
	).split('&');
	for (let i = 0; i < pairs.length; i++) {
		let pair = pairs[i].split('=');
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
	}
	return query;
}