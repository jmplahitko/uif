export default function isBlob(val: any): val is Blob {
	return val instanceof Blob;
}