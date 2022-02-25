export default function isFormData(val: any): val is FormData {
	return val instanceof FormData;
}