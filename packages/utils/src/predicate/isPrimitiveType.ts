import isBoolean from './isBoolean.js';
import isNumber from './isNumber.js';
import isString from './isString.js';

export default function isPrimitiveType(val: any): boolean {
	return isString(val) || isNumber(val) || isBoolean(val);
}