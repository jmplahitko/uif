import isFunction from './isFunction';

export default function isNoop(func: Function): func is (() => void) {
	let noopRegex = /(?:\(\s*\)\s*=>\s*\{\s*\}|function\s*\(\s*\)\s*\{\s*\}\s*)/g;
	if (!isFunction(func)) {
		throw new TypeError('Argument must be a function.');
	} else {
		return noopRegex.test(Function.prototype.toString.call(func));
	}
}
