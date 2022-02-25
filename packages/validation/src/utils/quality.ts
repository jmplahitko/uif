

function simpleCompare(a: any, b: any) {
	return a === b || (a !== a && b !== b);
}

export function hasAnyFlags(flags: any, mask: any) {
	flags = parseInt(flags, 10);
	mask = parseInt(mask, 10);

	if (isNaN(flags) || isNaN(mask)) {
		return false;
	}

	return (mask & flags) !== 0;
}

export function hasFlags(flags: any, mask: any) {
	flags = parseInt(flags, 10);
	mask = parseInt(mask, 10);

	if (isNaN(flags) || isNaN(mask)) {
		return false;
	}

	return (mask & flags) === mask;
}

export function is(val1: any, val2: any) {
	if (val1 === val2) return val1 !== 0 || 1 / val1 === 1 / val2;
	return val1 !== val1 && val2 !== val2;
}

export function isArray(val: any) {
	return null !== val && {}.toString.call(val) === '[object Array]';
}

export function isBufferArray(val: any) {
	return Object.prototype.toString.call(val) === '[object ArrayBuffer]';
}

export function isBlankObject(val: any) {
	return val !== null && typeof val === 'object' && !Object.getPrototypeOf(val);
}

export function isBoolean(val: any) {
	return typeof val === 'boolean';
}

export function isDate(val: any) {
	return val instanceof Date;
}

export function isIso8601DateString(val: any): boolean {
	const iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?(Z|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/i;

	return iso8601.test(val);
}

export function isUndefined(val: any) {
	return typeof val === 'undefined';
}

export function isEmpty(val: any) {
	let inheritedObjectRegex = /\[object [^\]]+\]/g;
	if (isNull(val) || isUndefined(val) || isFunction(val)) {
		return true;
	}
	if ((isArray(val) || isString(val)) && val.length > 0) {
		return false;
	}
	if ((isArray(val) || isString(val)) && val.length === 0) {
		return true;
	}
	if (isNumber(val)) {
		return false;
	}
	if (isBoolean(val)) {
		return false;
	}
	if (isDate(val)) {
		return isNaN(val.getTime());
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

export function isEqual(o1: any, o2: any) {
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
					if (!isEqual(o1[key], o2[key])) return false;
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
			keySet = Object.create(null);
			for (let key in o1) {
				if (key.charAt(0) === '$' || isFunction(o1[key])) continue;
				// @ts-ignore
				if (!isEqual(o1[key], o2[key])) return false;
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

export function isFunction(val: any) {
	return typeof val === 'function';
}

export function isHash(val: any) {
	return isObject(val) && !isArray(val) && !isFunction(val);
}

export function isInteger(val: any) {
	return isNumber(val) && val % 1 === 0;
}

export function isRegExp(val: any) {
	return val instanceof RegExp;
}

export function isString(val: any) {
	return typeof val === 'string';
}

export function isTypedArray(val: any) {
	const TYPED_ARRAY_REGEXP = new RegExp(/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/);
	return val && isNumber(val.length) && TYPED_ARRAY_REGEXP.test(Object.prototype.toString.call(val));
}

export function isNull(val: any) {
	return val === null;
}

export function isNumber(val: any) {
	return typeof val === 'number' && !isNaN(val);
}

export function isObject(val: any) {
	return null !== val && {}.toString.call(val) === '[object Object]';
}

export function isPromise(val: any) {
	return !!val && isFunction(val.then);
}

export function isWindow(val: any) {
	return val && val.window === val;
}