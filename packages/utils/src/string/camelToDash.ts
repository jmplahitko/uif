import isString from '../predicate/isString';
import throwError from '../_internal/throwError';

/**
 * Camel-case format to dash-case format
 *
 * @function camelToDash
 * @instance
 * @param {string} str - A string "inThisFormat"
 * @returns {string} A string "in-this-format"
 */
export default function camelToDash(str: string): string {
	if (!isString(str)) {
		throwError('camelToDash: Requires a string');
	}

	return str
		.replace(/\W+/g, '-')
		.replace(/([a-z\d])([A-Z])/g, '$1-$2')
		.toLowerCase();
}
