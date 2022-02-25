import isString from '../predicate/isString';

const NON_WORD_CHARACTERS = /[^\w]/gi;

export default function stripNonWordCharacters(val: any): string {
	return isString(val) ? val.replace(NON_WORD_CHARACTERS, '') : val;
}
