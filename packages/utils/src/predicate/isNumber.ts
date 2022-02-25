export default function isNumber(val: any): val is Number {
	return typeof val === 'number';
}
