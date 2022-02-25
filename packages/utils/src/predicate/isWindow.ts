export default function isWindow(val: any): val is Window {
	return val && val.window === val;
}
