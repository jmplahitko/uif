/**
 * Determine if a value is an array buffer
 *
 * @function isBufferArray
 * @instance
 * @param {*} val - Any value to check
 * @returns {boolean} returns true if value is a an array buffer
 */
export default function isArrayBuffer(val: any): val is ArrayBuffer {
	return Object.prototype.toString.call(val) === '[object ArrayBuffer]';
}
