/**
 * Determine if a value is an object with a null prototype
 *
 * @function isBlankObject
 * @instance
 * @param {*} value - Any value to check
 * @returns {boolean} returns true if value is an object with null prototype
 */
export default function isBlankObject(value: any): boolean {
	return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
}
