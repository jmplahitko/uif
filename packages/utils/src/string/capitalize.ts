import isString from '../predicate/isString';
import throwError from '../_internal/throwError';

/**
 * Capitalize the first letter of a string
 *
 * @function capitalize
 * @instance
 * @param {string} str - A string "in something like this format"
 * @returns {string} A string "In something like this format"
 */
export default function capitalize(str: string): string {
	if (!isString(str)) {
		throwError('capitalize: Requires a string');
	}
	return str.charAt(0).toUpperCase() + str.substr(1);
}
