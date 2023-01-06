import { displayName } from '../../../package.json';

export function setPageTitle(to, from, next) {
	document.title = to.meta?.pageTitle
		? `${displayName} | ${to.meta.pageTitle}`
		: displayName;

	next();
}
