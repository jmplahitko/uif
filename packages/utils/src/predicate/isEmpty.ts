import isDate from './isDate';
import isNoop from './isNoop';
import isObject from './isObject';
import isString from './isString';
import isNumber from './isNumber';
import isBoolean from './isBoolean';
import isFunction from './isFunction';
import isUndefined from './isUndefined';

/**
 * Determine if an object has no own properties or an array has has no values;
 * Also return false if obj is a number, boolean, or date
 *
 * @function isEmpty
 * @instance
 * @param {*} val - Value to check
 * @returns {boolean} return true if obj is empty, null, undefined, a noop or an Object that has none of its own properties
 */

// TODO: Get these types into a d.ts file
type EmptyObject = {
	[k in any]: never;
}

type EmptyArray = Array<never>;

type Empty = EmptyObject | EmptyArray | null | undefined | '' | (() => void);

// TODO: Keep this return type narrowing in our attention in case it causes typing issues in conditionals.
export default function isEmpty(val: any): val is Empty {
	let inheritedObjectRegex = /\[object [^\]]+\]/g;
	if (null === val) {
		return true;
	}
	if ((Array.isArray(val) || isString(val)) && val.length > 0) {
		return false;
	}
	if ((Array.isArray(val) || isString(val)) && val.length === 0) {
		return true;
	}
	if (isNumber(val)) {
		return false;
	}
	if (isBoolean(val)) {
		return false;
	}
	if (isUndefined(val)) {
		return true;
	}
	if (isDate(val)) {
		return isNaN(val.getTime());
	}
	if (isFunction(val)) {
		return isNoop(val);
	}
	if (!isObject(val) && inheritedObjectRegex.test(Object.prototype.toString.call(val))) {
		return false;
	}
	if (isObject(val)) {
		for (let key in val) {
			if (val.hasOwnProperty(key)) {
				return false;
			}
		}
	}

	return true;
}
