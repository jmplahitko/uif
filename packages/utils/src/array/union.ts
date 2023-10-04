import { dedup } from './dedup';

export function union<T = any>(arr1: T[], arr2: T[]): T[] {
	return dedup<T>(arr1.concat(arr2));
}