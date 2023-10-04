import equals from '../predicate/equals';

export function dedup<T = any>(arr: T[]): T[] {
	return arr.filter((x, ndx) => (
		ndx === arr.findIndex(y => equals(x, y))
	));
}