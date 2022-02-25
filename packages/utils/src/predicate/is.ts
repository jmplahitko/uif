import curry from '../function/curry';

/*
	Got this from a polyfill at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is ;
	Emulates new Object.is() function that will be in ES6, which is a safe alternative to using '===', which does not properly
	compare '+0 === -0' or 'NaN === NaN'.
	Does not work when comparing objects and arrays, see equals()
*/

function is(x: any, y: any): boolean {
	if (Object.is) {
		return Object.is(x, y);
	} else {
		// SameValue algorithm
		if (x === y) {
			// Steps 1-5, 7-10
			// Steps 6.b-6.e: +0 != -0
			return x !== 0 || 1 / x === 1 / y;
		} else {
			// Step 6.a: NaN == NaN
			return x !== x && y !== y;
		}
	}
}

export default curry(is);
