import isObject from '../predicate/isObject';
import throwError from '../_internal/throwError';

/**
 * parses a dot notation property to return prop from an object
 *
 * @function deepGet
 * @instance
 * @param {object} obj - An object
 * @param {string} prop - A property value, should be a string
 * @returns returns the property from an object based on the dot notation of the prop
 *
 * @example
 * let someObject = {'a': 1, 'b': {'c': 2}}
 * let someProp = 'b.c';
 * deepGet(someObject, someProp)
 * returns 2
 */
export default function deepGet<T = any>(obj: object, prop: string): T | void {
	if (!isObject(obj)) {
		throwError('deepGet: first parameter must be an object');
	}

	if (obj.hasOwnProperty(prop)) {
		return obj[prop];
	} else {
		let props = prop.split('.');
		if (props.length > 1) {
			if (obj.hasOwnProperty(props[0])) {
				return deepGet(obj[props[0]], props.slice(1).join('.'));
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	}
}
