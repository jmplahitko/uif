export default function getBaseHref(_document): any
{
	let bases = _document.getElementsByTagName('base');
	let baseHref = null;

	if (bases.length) {
		baseHref = bases[0].href;
	}

	return baseHref;
};
