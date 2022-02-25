import { isArray, isBoolean, isEmpty, isNull, isNumber, isString, isUndefined } from './quality';

export function beBoolean(value: any) {
	return isBoolean(value);
}

export function beInRange(num1: number, num2: number) {
	return function beInRange(value: any) {
		return (isNumber(value) && !isNaN(value)) ? (value >= num1 && value <= num2) : false;
	}
}

export function beValidEnum(arr: Array<string|number>) {
	return function beValidEnum(value: any) {
		return arr.includes(value);
	}
}

export function length(num1: number, num2: number) {
	return function beValidLength(value: any) {
		return ((isString(value) || isArray(value)) && isNumber(value.length)) ? (value.length >= num1 && value.length <= num2) : false;
	}
}

export function lengthOrEmpty(num1: number, num2: number) {
	return function beValidLengthOrEmpty(value: any) {
		if (isNull(value) || isUndefined(value)) {
			return true;
		} else {
			return ((isString(value) || isArray(value)) && isNumber(value.length)) ? (value.length >= num1 && value.length <= num2) : false;
		}
	}
}

export function match(rx: RegExp) {
	return function matches(value: any) {
		return rx.test(value);
	}
}

export function max(num: number) {
	return function beLessThan(val: number) {
		return val <= num;
	}
}

export function min(num: number) {
	return function beGreaterThan(val: number) {
		return val >= num;
	}
}

export function notNull(value: any) {
	return !isNull(value);
}

export function notEmpty(value: any) {
	return isNull(value) || isUndefined(value) ? false : !isEmpty(value);
}