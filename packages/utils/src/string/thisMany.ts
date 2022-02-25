import curry from '../function/curry';
import isString from '../predicate/isString';
import isNumber from '../predicate/isNumber';
import throwError from '../_internal/throwError';

/**
 * @function thisMany
 * @instance
 * @param {string} s - string to be repeated
 * @param {number|string} num - number of number as string
 * @returns {string} returns a value repeated this many times
 */
function thisMany(s: string, num: number): string {
	if (!isString(s)) {
		throwError('thisMany: Requires a string as first parameter');
	}

	if (!isNumber(num)) {
		throwError('thisMany: Requires a number as second parameter');
	}

	let str = s;
	for (let i = 1, j = num; i < j; i++) {
		str += s;
	}
	return str;
}

export default curry(thisMany);
