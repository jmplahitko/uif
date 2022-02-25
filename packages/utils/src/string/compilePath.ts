import pathToRegexp from 'path-to-regexp';
import { PathFunctionOptions } from 'path-to-regexp';
import isObject from '../predicate/isObject';

export default function compilePath(path: string, data: object = {}, options: PathFunctionOptions = {}): string {
	data = Object.assign({}, data);
	let tokens = pathToRegexp.parse(path);
	let shouldCustomEncode = false;
	let customEncode = (value: string) => value;

	// any
	tokens.forEach(token => {
		if (isObject(token)) {
			// @ts-ignore
			if (!token.optional && !data.hasOwnProperty(token.name)) {
				// @ts-ignore
				data[token.name] = `:${token.name}`;
				shouldCustomEncode = true;
			}
		}
	});

	if (!options.encode && shouldCustomEncode) {
		options.encode = customEncode;
	}

	let toPath = pathToRegexp.compile(path);
	let compiledPath = toPath(data, options);

	return compiledPath;
}
