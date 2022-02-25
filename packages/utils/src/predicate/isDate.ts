/**
 * Determine if a value is a date object
 *
 * @function isDate
 * @instance
 * @param {*} val - Any value to check
 * @returns {boolean} returns true if value is a a date object
 */
export default function isDate(val: any): val is Date {
	return val !== null && Object.prototype.toString.call(val) === '[object Date]';
}
