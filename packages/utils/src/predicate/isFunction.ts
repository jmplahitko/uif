import isUndefined from './isUndefined';

export default function isFunction(val: any): val is Function {
	return null !== val && !isUndefined(val) && Object.prototype.toString.call(val) === '[object Function]';
}
