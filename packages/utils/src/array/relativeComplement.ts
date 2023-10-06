
export default function relativeComplement<T = any>(a: T[], b: T[]): T[] {
	return b.filter(x => !a.includes(x)); // naively assumes ref equality..
}