import curry from '../function/curry';

import isObject from '../predicate/isObject';
import isUndefined from '../predicate/isUndefined';
import throwError from '../_internal/throwError';
import deepGet from '../object/deepGet';

function makeCSV(arr: Array<any>, header: Array<any>): string {
	if (!Array.isArray(arr)) {
		throwError('makeCSV: First parameter must be an array');
	}

	if (!Array.isArray(header)) {
		throwError('makeCSV: Second parameter must be an array');
	}

	let newArr = arr.map(function(obj) {
		if (!isObject(obj)) {
			throwError('makeCSV: first array can only contain objects');
		}
		return header.map(function(prop) {
			let value = deepGet(obj, prop);

			return isUndefined(value) ? '""' : `\"${String(value).replace(/\"/g, '""')}\"`;
		});
	});

	let newHeader = header.map((hdr) => hdr.split('.').pop());
	newArr.unshift(newHeader);
	return newArr.join('\r');
}

export default curry(makeCSV);
