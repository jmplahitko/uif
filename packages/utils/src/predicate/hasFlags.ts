import curry from '../function/curry';
import throwError from '../_internal/throwError';

function hasFlags(flags: number, mask: number): boolean {
	if (isNaN(flags) || isNaN(mask)) {
		throwError('hasFlags: arguments cannot be NaN');
	}
	return (mask & flags) === mask;
}

export default curry(hasFlags);
