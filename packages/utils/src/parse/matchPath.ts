import { match } from 'path-to-regexp';

function matchPath<T extends object = any>(path: string, compiledPath: string): T {
	const extract = match(path);
	const matched = extract(compiledPath);

	return (matched
		? matched.params
		: {}) as T;
}

export default matchPath;