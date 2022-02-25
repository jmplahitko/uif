export default function IsURLSearchParams(val: any): val is URLSearchParams {
	return val instanceof URLSearchParams;
}