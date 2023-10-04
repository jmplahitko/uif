import { intersect } from './intersect';
import { union } from './union';

export function complement<T = any>(arr1: T[], arr2: T[]): T[] {
	const un = union<T>(arr1, arr2);
	const int = intersect<T>(arr1, arr2);

	return un.filter(x => (
		!int.includes(x)
	));
}