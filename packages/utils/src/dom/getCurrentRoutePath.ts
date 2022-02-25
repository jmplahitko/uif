import getBaseHref from './getBaseHref';
import isWindow from '../predicate/isWindow';

export default function getCurrentRoutePath() {
	if (isWindow(window) && document) {
		const baseHref = getBaseHref(document);
		const href = window.location.href;
		return href.replace(baseHref, '/');
	}
}
