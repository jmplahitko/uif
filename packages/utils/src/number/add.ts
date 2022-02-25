import curry from '../function/curry';
import throwError from '../_internal/throwError';

function add(num1: number, num2: number): number {
	if (isNaN(num1) || isNaN(num2)) {
		throwError('add: arguments cannot be NaN');
	}

	return num1 + num2;
}

export default curry(add, true);
