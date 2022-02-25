import isString from '../predicate/isString';
import throwError from '../_internal/throwError';

/**
 * Dash-case format to camel-case format
 *
 * @function dashToCamel
 * @instance
 * @param {string} str - A string "in-this-format"
 * @returns {string} A string "inThisFormat"
 */
export default function dashToCamel(str: string): string {
	if (!isString(str)) {
		throwError('dashToCamel: Requires a string');
	}

	return str.toLowerCase().replace(/\W+(.)/g, (g) => g[1].toUpperCase());
}
