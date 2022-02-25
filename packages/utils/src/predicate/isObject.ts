export default function isObject(val: any): val is {} {
	return null !== val && Object.prototype.toString.call(val) === '[object Object]';
}
