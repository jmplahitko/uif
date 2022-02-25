import curry from '../function/curry';
import throwError from '../_internal/throwError';
import equals from './equals';

function isInArray(arr: Array<any>, val: any): boolean {
	if (!Array.isArray(arr)) {
		throwError('isInArray: Requires an array as the first parameter');
	}

	let includes = false;

	for (let value of arr) {
		if (equals(value, val)) {
			includes = true;
			break;
		}
	}

	return includes;
}

export default curry(isInArray);
