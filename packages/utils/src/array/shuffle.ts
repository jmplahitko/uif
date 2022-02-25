import throwError from '../_internal/throwError';

// thanks to https://github.com/coolaj86/knuth-shuffle/blob/master/index.js

export default function shuffle<T = any>(arr: Array<T>): Array<T> {
	if (!Array.isArray(arr)) {
		throwError('shuffle: Requires an array as the first parameter');
	}

	var currentIndex = arr.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = arr[currentIndex];
		arr[currentIndex] = arr[randomIndex];
		arr[randomIndex] = temporaryValue;
	}

	return arr;
}
