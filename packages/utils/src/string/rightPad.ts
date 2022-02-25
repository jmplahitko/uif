/**
 * @function rightPad
 * @instance
 * @param {string} string - string to modify
 * @param {number} width - final intended width of new string
 * @param {string} pad - value to add as a pad to the right
 * @returns {string} returns a new string with padding to the right
 */
export default function rightPad(str: string, width: number, pad: string = ' ') {
	str = str + '';

	while (str.length < width) {
		str = '' + str + pad;
	}

	return str;
}
