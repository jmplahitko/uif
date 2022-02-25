import { curry } from '../function';

function pivot(direction: 'left'|'right', arr: any[][]): any[][] {
	// TODO: Enforce consistent row width
	const pivotedLength = arr[0]?.length;
	const pivoted: any[][] = [];

	for(let i = 0; i < pivotedLength; i++) {
		if (direction === 'right') {
			pivoted.push(arr.map(x => x[i]).reverse());
		} else {
			pivoted.push(arr.map(x => x[Math.abs(i - (pivotedLength - 1))]));
		}
	}

	return pivoted;
}

export default curry(pivot);