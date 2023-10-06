
import relativeComplement from '../array/relativeComplement.js';
import isEmpty from '../predicate/isEmpty.js';
import isObject from '../predicate/isObject.js';
import isPrimitiveType from '../predicate/isPrimitiveType.js';

export default function diff<T extends object = Record<string, any>, U extends object = T>(obj1:T, obj2: U, arrayStrategy: (arr1: any[], arr2: any[]) => any[] = relativeComplement): Partial<U> {
	const delta: Partial<U> = {};

	Object.keys(obj2).forEach(key => {
		const obj2val = obj2[key];
		let subdelta;

		if (Object.hasOwnProperty.call(obj1, key)) {
			const obj1val = obj1[key];
			if (typeof obj1val === typeof obj2val) {
				if (isPrimitiveType(obj1val) && obj2val !== obj1val) {
					subdelta = obj2val;
				} else if (isObject(obj1val)) {
					subdelta = diff(obj1val, obj2val, arrayStrategy);
				} else if (Array.isArray(obj1val)) {
					subdelta = arrayStrategy(obj1val, obj2val);
				}
			}
		} else {
			subdelta = obj2val;
		}

		if (!isEmpty(subdelta)) {
			delta[key] = subdelta;
		}
	})

	return delta;
}