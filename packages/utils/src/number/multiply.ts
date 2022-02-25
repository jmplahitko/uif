import curry from '../function/curry';
import throwError from '../_internal/throwError';

function multiply(num1: number, num2: number): number {
	if (isNaN(num1) || isNaN(num2)) {
		throwError('multiply: arguments cannot be NaN');
	}

	return num1 * num2;
}

export default curry(multiply, true);
