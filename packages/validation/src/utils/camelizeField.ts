import { camelize } from '@ui-framework/utils';

export default function camelizeField(str: string): string {
	str = str.replace(/\s/g, '');
	const fieldNameArray = str.split('.');
	let camelizedStr = ``;

	fieldNameArray.map((substr) => {
		camelizedStr = `${camelizedStr ? camelizedStr + '.' : ''}${camelize(substr)}`;
	})

	return camelizedStr;
};