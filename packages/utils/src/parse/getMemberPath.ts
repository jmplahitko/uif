function cleanseAssertionOperators(parsedName: string): string {
	return parsedName.replace(/[?!]/g, '').replace(/(?:\s|;|{|}|\(|\)|)+/gm, '');
}

/**
 * https://github.com/nartc/mapper/blob/master/src/utils/getMemberPath.ts
 * This implementation is copied from @nartc/automapper
 */
export default function getMemberPath<T>(fn: Selector<T>): string {
	const fnString = fn.toString();

	// ES6 prop selector:
	// "x => x.prop"
	if (fnString.includes('=>')) {
		return cleanseAssertionOperators(
			fnString.substring(fnString.indexOf('.') + 1),
		);
	}

	// ES5 prop selector:
	// "function (x) { return x.prop; }"
	// webpack production build excludes the spaces and optional trailing semicolon:
	//   "function(x){return x.prop}"
	// FYI - during local dev testing i observed carriage returns after the curly brackets as well
	// Note by maintainer: See https://github.com/IRCraziestTaxi/ts-simple-nameof/pull/13#issuecomment-567171802 for
	// explanation of this regex.
	const matchRegex = /function\s*\(\w+\)\s*{[\r\n\s]*return\s+\w+\.((\w+\.)*(\w+))/i;

	const es5Match = fnString.match(matchRegex);

	if (es5Match) {
		return es5Match[1]!;
	}

	return '';
}