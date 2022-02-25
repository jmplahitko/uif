import copy from '../factories/copy';
import isDate from '../predicate/isDate';
import isObject from '../predicate/isObject';
import throwError from '../_internal/throwError';

export default function merge<T, U>(dest: T, src: U): T & U {
	// merge() is non-destructive (does not change original objects)
	if (!isObject(dest) || !isObject(src)) {
		throwError('merge: Object required for first and second parameters');
	}
	let result = <T & U>{}; // return result
	for (let i in src) {
		// for every property in src
		if (i in dest && isDate(src[i]) && i !== null) {
			(<any>result)[i] = new Date((<any>src)[i].valueOf()); // distinguish between date and object, set to new date
		} else if (i in dest && isObject(src[i]) && i !== null) {
			// @ts-ignore
			(<any>result)[i] = merge(dest[i], src[i]); // if it's an object, merge <-- merge is already non-destructive.
		} else {
			(<any>result)[i] = copy(src[i]); // add it to result
		}
	}
	for (let i in dest) {
		// add the remaining properties from object 1
		if (i in <any>result) {
			continue;
		}
		(<any>result)[i] = copy(dest[i]);
	}
	return result;
}
