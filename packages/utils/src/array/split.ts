export default function split(arr: Array<any>, ndx: number): Array<Array<any>> {
	let head = arr.slice(0, ndx);
	let tail = arr.slice(ndx);

	return [head, tail];
}
