import { compile, parse } from 'path-to-regexp';
import isString from '../predicate/isString';

function compilePath(path: string, data: object = {}): string {
	data = Object.assign({}, data);
	let tokens = parse(path);

	// any
	tokens.forEach(token => {
		if (!isString(token)) {
			if (!data.hasOwnProperty(token.name)) {
				data[token.name] = `:${token.name}`;
			}
		}
	});

	let toPath = compile(path, { encode: encodeURIComponent });
	let compiledPath = toPath(data);

	return decodeURIComponent(compiledPath);
}

export default compilePath;