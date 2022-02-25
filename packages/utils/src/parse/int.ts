// A stricter parse function (instead of native parseInt);
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt

export default function int(value: string | number): number {
	value = String(value);
	if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
		return Number(value);
	}
	return NaN;
}
