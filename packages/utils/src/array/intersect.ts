
export function intersect<T = any>(arr1: T[], arr2: T[]): T[] {
	return arr1.filter(x => arr2.includes(x)); // naively assumes ref equality..
}