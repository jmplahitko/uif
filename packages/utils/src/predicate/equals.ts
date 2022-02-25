import curry from '../function/curry';
import isDate from './isDate';
import isRegExp from './isRegExp';
import isWindow from './isWindow';
import isFunction from './isFunction';
import isUndefined from './isUndefined';
import createMap from '../_internal/createMap';
import simpleCompare from '../_internal/simpleCompare';
import isIso8601DateString from './isIso8601DateString';

function equals(o1: any, o2: any): boolean {
	if (o1 === o2) return true;
	if (o1 === null || o2 === null) return false;
	// eslint-disable-next-line no-self-compare
	if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
	if (isIso8601DateString(o1)) {
		if (!isIso8601DateString(o2)) return false;
		return simpleCompare(new Date(o1).getTime(), new Date(o2).getTime());
	}
	let t1 = typeof o1,
		t2 = typeof o2,
		length,
		key,
		keySet;

	if (t1 === t2 && t1 === 'object') {
		if (Array.isArray(o1)) {
			if (!Array.isArray(o2)) return false;
			if ((length = o1.length) === o2.length) {
				for (key = 0; key < length; key++) {
					if (!equals(o1[key], o2[key])) return false;
				}
				return true;
			}
		} else if (isDate(o1)) {
			if (!isDate(o2)) return false;
			// @ts-ignore
			return simpleCompare(o1.getTime(), o2.getTime());
		} else if (isRegExp(o1)) {
			if (!isRegExp(o2)) return false;
			return o1.toString() === o2.toString();
		} else {
			if (isWindow(o1) || isWindow(o2) || Array.isArray(o2) || isDate(o2) || isRegExp(o2)) return false;
			keySet = createMap();
			for (let key in o1) {
				if (key.charAt(0) === '$' || isFunction(o1[key])) continue;
				// @ts-ignore
				if (!equals(o1[key], o2[key])) return false;
				keySet[key] = true;
			}
			for (key in o2) {
				if (!(key in keySet) && key.charAt(0) !== '$' && !isUndefined(o2[key]) && !isFunction(o2[key])) return false;
			}
			return true;
		}
	}
	return false;
}

export default curry(equals);
