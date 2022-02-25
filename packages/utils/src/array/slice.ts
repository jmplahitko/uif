import throwError from '../_internal/throwError';

export default function slice<T = any>(arr: Array<T>, fromIndex?: number, toIndex?: number): Array<T> {
	if (!Array.isArray(arr)) {
		throwError('slice: First argument must be an array.');
	}

	switch (arguments.length) {
		case 1:
			return slice(arr, 0, arr.length);
		case 2:
			return slice(arr, fromIndex, arr.length);
		default:
			// This means toIndex / fromIndex are passed in
			let list: Array<T> = [];
			let idx = 0;
			let len = Math.max(0, Math.min(arr.length, toIndex as number) - (fromIndex as number));
			while (idx < len) {
				list[idx] = arr[(fromIndex as number) + idx];
				idx += 1;
			}
			return list;
	}
}
