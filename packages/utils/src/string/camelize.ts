/**
 * Camel-case format
 *
 * @function camelize
 * @instance
 * @param {string} str - A string "In This Format"
 * @returns {string} A string "inThisFormat"
 */

export default function camelize(str: string): string {
    return `${str[0].toLowerCase()}${str.substr(1)}`.replace(/\s/g, '');
}