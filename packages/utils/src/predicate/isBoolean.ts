/**
 * Determine if a value is a boolean
 *
 * @function isBoolean
 * @instance
 * @param {*} val - Any value to check
 * @returns {boolean} returns true if value is a boolean
 */
export default function isBoolean(val: any): val is boolean {
	return typeof val === 'boolean';
}
