import isUndefined from './isUndefined';

export default function isClass(val: any): boolean {
	return null !== val && !isUndefined(val) && typeof val === 'function' && /^\s*class\s+/.test(val.toString());;
}
