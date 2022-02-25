import { curry } from '../function';

export type PromiseResolve<T> = (value: T | PromiseLike<T>) => void;
export type PromiseReject<E = any> = (reason?: E) => void;
export type Operator<T, E = any> = (value: T, next: (value: T) => void, resolve: PromiseResolve<T>, reject: PromiseReject<E>) => void;

export function createPipe<T, E = any>(operators: Iterable<Operator<T, E>>) {
	if (!operators[Symbol.iterator]) {
		throw new TypeError(`Pipeline expects an iterable, got ${typeof operators}`);
	}

	const iterable: Array<Operator<T, E>> = Array.from(operators);

	const nextOperator = curry<[IterableIterator<Operator<T, E>>, PromiseResolve<T>, PromiseReject<E>, T], void>((iterator, resolve, reject, value: T): void => {
		let it: IteratorResult<Operator<T, E>> = iterator.next();

		if (!it.done) {
			it.value(
				value,
				nextOperator(iterator, resolve, reject),
				(_val: any) => {
					resolve(_val);
				},
				(_val: any) => {
					reject(_val);
				}
			);
		} else {
			resolve(value);
		}
	});

	return (value: T): Promise<T> => {
		const iterator = iterable[Symbol.iterator]();

		return new Promise<T>((resolve, reject) => {
			const next = nextOperator(iterator, resolve, reject);

			next(value);
		});
	}
}