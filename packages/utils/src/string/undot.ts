import isString from '../predicate/isString';
import throwError from '../_internal/throwError';

/**
 * @function undot
 * @instance
 * @param {string} str - a string like 'something.else'
 * @returns {string} returns a string like 'something else'
 */
export default function undot(str: string): string {
	if (!isString(str)) {
		throwError('undot: Requires a string');
	}
	return str.split('.').join(' ');
}
