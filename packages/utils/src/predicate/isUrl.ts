export default function isUrl(url: any): boolean {
	// Generously borrowed from @stephenhay (38 chars) : https://mathiasbynens.be/demo/url-regex
	let rx = new RegExp(/^(https?|s?ftp):\/\/[^\s/$.?#].[^\s]*$/);
	return rx.test(url);
}