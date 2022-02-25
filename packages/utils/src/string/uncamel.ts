import isString from '../predicate/isString';
import throwError from '../_internal/throwError';

/**
 * @function uncamel
 * @instance
 * @param {string} str - a string like 'somethingElse'
 * @returns {string} returns a string like 'Something Else'
 */
export default function uncamel(str: string): string {
	if (!isString(str)) {
		throwError('uncamel: Requires a string');
	}

	return str.charAt(0).toUpperCase() + str.substr(1).replace(/[A-Z]/g, ' $&');
}
