import isString from '../predicate/isString';
import isNumber from '../predicate/isNumber';
import isBoolean from '../predicate/isBoolean';
import isInArray from '../predicate/isInArray';

export default function toBoolean(val: any): boolean {
	let whitelistTrueValues = [true, 'true'];
	let whitelistFalseValues = [false, 'false'];
	let whitelistTypes = ['boolean', 'string', 'number'];

	if (isInArray(whitelistTypes, typeof val)) {
		if (isBoolean(val)) {
			return val;
		} else if (isString(val) && isInArray(whitelistTrueValues, val.toLowerCase())) {
			return true;
		} else if (isString(val) && isInArray(whitelistFalseValues, val.toLowerCase())) {
			return false;
		} else if (isNumber(val) && val < 0) {
			return false;
		} else if (isInArray(whitelistTrueValues, val)) {
			return true;
		} else if (isInArray(whitelistFalseValues, val)) {
			return false;
		} else {
			return Boolean(val);
		}
	} else {
		return Boolean(val);
	}
}
