import curry from '../function/curry';
import throwError from '../_internal/throwError';

function divide(num1: number, num2: number): number {
	if (isNaN(num1) || isNaN(num2)) {
		throwError('divide: arguments cannot be NaN');
	}

	return num1 / num2;
}

export default curry(divide, true);
