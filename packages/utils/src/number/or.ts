import curry from '../function/curry';
import throwError from '../_internal/throwError';

function or(p: number, c: number): number {
	if (isNaN(p) || isNaN(c)) {
		throwError('or: arguments cannot be NaN');
	}
	return p | c;
}

export default curry(or, true);
