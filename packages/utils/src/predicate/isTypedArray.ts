import isNumber from './isNumber';

const TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/;

type TypedArray = Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;

export default function isTypedArray(val: any): val is TypedArray {
	return val && isNumber(val.length) && TYPED_ARRAY_REGEXP.test(Object.prototype.toString.call(val));
}
