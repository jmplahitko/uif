import slice from './slice';

export default function rest<T = any>(array: Array<T>, index: number): Array<T> {
	index = isNaN(index) ? 0 : index;
	return slice(array).splice(index);
}
