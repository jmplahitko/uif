import curry from '../function/curry';
import throwError from '../_internal/throwError';

function hasAnyFlags(flags: number, mask: number): boolean {
	if (isNaN(flags) || isNaN(mask)) {
		throwError('hasAnyFlags: arguments cannot be NaN');
	}

	return (mask & flags) !== 0;
}

export default curry(hasAnyFlags);
