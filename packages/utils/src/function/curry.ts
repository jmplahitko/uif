import head from '../array/head';
import rest from '../array/rest';
import isFunction from '../predicate/isFunction';
import throwError from '../_internal/throwError';

/**
 * Wrap a function with an arity of (n > 1) so it can accept an argument at a time, and
 * optionally allow a function with an arity of (n > 1) to accept more than n arguments.
 *
 * @function curry
 * @instance
 * @param {function} fn - Function to curry
 * @param {boolean} overload - Indicates whether the curried function can allow more arguments than defined (WARNING: only use this if all the function's arguments and return value are the same type!)
 * @returns {function}
 * @example
 * let someFunction = function(arg1, arg2) {
 * //... do stuff here to arg1 and arg2
 * }
 * someFunction(1,2);
 *
 * // but if I don't know what arg2 is yet..
 *
 * let curriedSomeFunction = U.curry(someFunction);
 * let awaitingArg2 = curriedSomeFunction(1);
 *
 * // returns a function that waits for more arguments...
 *
 * awaitingArg2(2);
 *
 * // returns once all expected arguments are applied
 *
 * @example
 * // An example of overloading:
 * let someAdd = function(num1, num2) {
 * 	return num1 + num2
 * }
 *
 * //... but if I need to add 3 numbers:
 *
 * let overflowedSomeAdd = U.curry(someAdd, true);
 *
 * overflowedSomeAdd(1, 2, 3);
 * // returns 6
 *
 * // ...or use it like a normally curried function:
 * let awaitingMoreArgs = overflowedSomeAdd(1);
 * // ...and apply a few more arguments:
 * awaitingMoreArgs(2, 3);
 * // returns 6
 *
 */

type TCurry1<T, R> = (a: T) => R;

type TCurry2<T, U, R> = {
	(a: T): TCurry1<U, R>;
	(a: T, b: U): R;
};

type TCurry3<T, U, V, R> = {
	(a: T): TCurry2<U, V, R>;
	(a: T, b: U): TCurry1<V, R>;
	(a: T, b: U, c: V): R;
};

type TCurry4<T, U, V, W, R> = {
	(a: T): TCurry3<U, V, W, R>;
	(a: T, b: U): TCurry2<V, W, R>;
	(a: T, b: U, c: V): TCurry1<W, R>;
	(a: T, b: U, c: V, d: W): R;
};

type TCurry5<T, U, V, W, X, R> = {
	(a: T): TCurry4<U, V, W, X, R>;
	(a: T, b: U): TCurry3<V, W, X, R>;
	(a: T, b: U, c: V): TCurry2<W, X, R>;
	(a: T, b: U, c: V, d: W): TCurry1<X, R>;
	(a: T, b: U, c: V, d: W, e: X): R;
};

type TCurry6<T, U, V, W, X, Y, R> = {
	(a: T): TCurry5<U, V, W, X, Y, R>;
	(a: T, b: U): TCurry4<V, W, X, Y, R>;
	(a: T, b: U, c: V): TCurry3<W, X, Y, R>;
	(a: T, b: U, c: V, d: W): TCurry2<X, Y, R>;
	(a: T, b: U, c: V, d: W, e: X): TCurry1<X, R>;
	(a: T, b: U, c: V, d: W, e: X, f: Y): R;
};

type TCurry7<T, U, V, W, X, Y, Z, R> = {
	(a: T): TCurry6<U, V, W, X, Y, Z, R>;
	(a: T, b: U): TCurry5<V, W, X, Y, Z, R>;
	(a: T, b: U, c: V): TCurry4<W, X, Y, Z, R>;
	(a: T, b: U, c: V, d: W): TCurry3<X, Y, Z, R>;
	(a: T, b: U, c: V, d: W, e: X): TCurry2<X, Z, R>;
	(a: T, b: U, c: V, d: W, e: X, f: Y): TCurry1<Z, R>;
	(a: T, b: U, c: V, d: W, e: X, f: Y, g: Z): R;
};

type TVariadicCurry<T, R> = T extends [any, any, any, any, any, any, any]
	? TCurry7<T[0], T[1], T[2], T[3], T[4], T[5], T[6], R>
	: T extends [any, any, any, any, any, any]
	? TCurry6<T[0], T[1], T[2], T[3], T[4], T[5], R>
	: T extends [any, any, any, any, any]
	? TCurry5<T[0], T[1], T[2], T[3], T[4], R>
	: T extends [any, any, any, any]
	? TCurry4<T[0], T[1], T[2], T[3], R>
	: T extends [any, any, any]
	? TCurry3<T[0], T[1], T[2], R>
	: T extends [any, any]
	? TCurry2<T[0], T[1], R>
	: T extends [any]
	? TCurry1<T[0], R>
	: any;

export default function curry<T extends any[], R>(fn: (...args: T) => R, allowOverflow: boolean = false): TVariadicCurry<T, R> {
	if (!isFunction(fn)) {
		throwError('curry: Requires a function');
	}

	// @ts-ignore
	return function _invoked1(...args: T): R | TVariadicCurry<T, R> {
		let slice = Array.prototype.slice;

		if (fn.length > args.length) {
			// @ts-ignore
			return function _invoked2(..._args: T): R | TVariadicCurry<T, R> {
				// @ts-ignore
				return _invoked1.apply(null, args.concat(slice.apply(_args)));
			};
		} else if (fn.length < args.length && allowOverflow) {
			return _invoked1.apply(
				null,
				// @ts-ignore
				[fn.apply(null, head(args, fn.length))].concat(rest(args, fn.length))
			);
		}

		return fn.apply(null, args);
	};
}
