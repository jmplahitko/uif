import isObject from '../predicate/isObject';
import throwError from '../_internal/throwError';

export default function pick<T, U>(obj1: T, obj2: { [key: string]: string | null }): U {
	// pick() is non-destructive (does not change original objects)
	if (!isObject(obj1) || !isObject(obj2)) {
		throwError('pick: Object required for first and second parameters');
	}

	let result = <U>{};
	for (let i in obj2) {
		if (i in obj1) {
			if (obj2[i] === null) {
				(<any>result)[i] = obj1[i];
			} else {
				(<any>result)[<string>obj2[i]] = obj1[i];
			}
		} else {
			continue;
		}
	}

	return result;
}