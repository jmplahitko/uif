import curry from '../function/curry';
import isString from '../predicate/isString';
import throwError from '../_internal/throwError';

/**
 * @function concat
 * @instance
 * @param {string} str - any string
 * @param {string } toBeConcatenated - any string
 * @returns {string} returns a new string of both values Concatenated
 */
function concat(str: string, toBeConcatenated: string | Array<string>): string {
	if (!isString(str)) {
		throwError('string/concat: Requires a string as first parameter');
	} else if (!Array.isArray(toBeConcatenated) && !isString(toBeConcatenated)) {
		throwError('concat: Requires a string or array of strings as second parameter');
	}
	return Array.isArray(toBeConcatenated) ? str.concat.apply(null, toBeConcatenated) : str.concat(toBeConcatenated);
}

export default curry(concat, true);
