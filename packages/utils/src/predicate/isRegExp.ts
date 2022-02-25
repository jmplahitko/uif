export default function isRegExp(val: any): val is RegExp {
	return val instanceof RegExp;
}
