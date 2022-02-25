import isEmpty from '../predicate/isEmpty';
import isObject from '../predicate/isObject';
import isInArray from '../predicate/isInArray';
import throwError from '../_internal/throwError';

export default function prune<T extends object = object, R extends object = object>(obj: T, ...propsToRemove: string[]): R {
	let keys = Object.keys(obj);
	let newObj = <R>{};

	if (!isObject(obj)) {
		throwError('prune: Requires an object as first parameter');
	}
	// In order to remain non-destructive, we need to break the reference to 'obj' if
	// we short circuit due to any empty arguments. Otherwise, for instance, assigning
	// some let 'foo' to the result of prune(obj) could result in inadvertently
	// modifying 'obj' later through a referential binding created via 'foo'. See
	// egUtilities.spec.js to see a proof that this works.
	if (isEmpty(propsToRemove) || isEmpty(obj)) {
		return JSON.parse(JSON.stringify(obj));
	}

	for (let i = 0, j = keys.length; i < j; i++) {
		// Since Object.keys(obj) returns an array of strings, isInArray will implicitely
		// do type checking on all propsToRemove. If there is a non-string passed as a rest
		// argument, it will be ignored, as it will not be found in the keys collection.
		if (!isInArray(propsToRemove, keys[i])) {
			newObj[keys[i]] = obj[keys[i]];
		}
	}

	return newObj;
}
