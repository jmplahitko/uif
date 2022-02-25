/**
 * @function leftPad
 * @instance
 * @param {string} string - string to modify
 * @param {string} width - final intended width of new string
 * @param {string} pad - value to add as a pad to the left
 * @returns {string} returns a new string with padding to the left
 */
export default function leftPad(str: string, width: number, pad: string = ' '): string {
	str = str + '';

	while (str.length < width) {
		str = '' + pad + str;
	}

	return str;
}
