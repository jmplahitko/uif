/**
 * Determine if a value matches an acceptable ISO 8061 string format
 *
 * @function isIso8601DateString
 * @instance
 * @param {*} val - Any value to check
 * @returns {boolean} returns true if value matches an acceptable ISO 8061 string format
 */
export default function isIso8601DateString(val: any): boolean {
	const iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?(Z|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/i;

	return iso8601.test(val);
}
