/**
 * https://github.com/QuiiBz/influer/blob/main/src/index.ts
 * This initial implementation is based on the work by https://github.com/QuiiBz with the following changes:
 * 	1.  Allow for many observers (watchers) per property of the observed object,
 * 			thus dodging erroneous deletions of other observers.
 * 	2.	Observers should not be given the inherent ability to mutate state.
 * 	3.	Observers are created via selector instead of path string
 *  4. 	Proxy is revokable to allow for forcibly ending observation (Observable.conceal)
 */

import { ObserverCallback, ObservablesCache, Observable, Observer } from './types';
import { getMemberPath } from '@ui-framework/utils';
import recompose from './utils/recompose';

// These array methods do not detected by set or deleteProperty proxy handler traps, so we have to account for them ourselves.
const nonTrappableMutationMethods = ['pop', 'shift'];

export default function observable<T extends object>(initialState: T): Observable<T> {
	let idpool: number = 0;
	const cache: ObservablesCache = {};

	const createIgnore = (key: string, id: number) => () => {
		cache[key] = cache[key]?.filter(x => x.id !== id);
	};

	// Construct the next property key in a dot-notation
	const constructPropertyKey = (property: string | symbol, key?: string, isArray = false): string =>
		(key
			?
			isArray
				? `${key.toString()}[${property.toString()}]`
				:
				`${key.toString()}.${property.toString()}`
			: property.toString());

	const notifyObservers = (propertyKey: string, newValue: any, oldValue: any) => {
		const observers = cache[propertyKey];

		if (observers?.length) {
			observers.forEach(observer => {
				const { onChange, once, ignore } = observer;

				if (once) {
					ignore();
				}

				onChange(newValue, oldValue);
			});
		}
	};

	const handler = <K extends {} | []>(key: string = ''): ProxyHandler<K> => ({
		get(target, property, receiver) {
			const value = Reflect.get(target, property, receiver);

			if (target.hasOwnProperty(property)) {
				const newValue = (typeof value === 'object' && Object.keys(value).length > 0)
					? new Proxy(value, handler(constructPropertyKey(property, key)))
					: Array.isArray(value)
						? new Proxy(value, handler(constructPropertyKey(property, key, true)))
						: value;

				return newValue;
			} else if (Array.isArray(target) && nonTrappableMutationMethods.includes(property as string)) {
				return function(...args: any[]) {
					const propertyKey = key;
					const oldValue = Array.from(target);
					const result = (value as Function).apply(target, args);
					const newValue = target;

					notifyObservers(propertyKey, newValue, oldValue);

					return result;
				};
			}

			return value;
		},

		set(target, property, value, receiver) {
			let result: boolean = true;
			let propertyKey: string;
			let newValue: any;
			let oldValue: any;

			if (Array.isArray(target)) {
				if (property === 'length') {
					return Reflect.set(target, property, value, receiver);
				}

				propertyKey = key;

				oldValue = Array.from((recompose(initialState, propertyKey)));
				result = Reflect.set(target, property, value, receiver);

				if (result) {
					newValue = target;
				}
			} else {
				propertyKey = constructPropertyKey(property, key);
				oldValue = recompose(initialState, propertyKey);
				newValue = value;
				result = Reflect.set(target, property, value, receiver);
			}

			if (result) {
				notifyObservers(propertyKey, newValue, oldValue);
			}

			return result;
		},
	});

	const { proxy, revoke } = Proxy.revocable(initialState, handler());
	/**
	 * @param {boolean} once - If the property should be ignored after the first call.
	 * @returns A function that takes a selector for a nested value to be observed, which returns a function that takes a callback to be called when the nested value changes.
	 */
	const observe = (once: boolean) =>
		<P>(selector: Selector<T, P>) => {
			const key = getMemberPath(selector);

			return (onChange: ObserverCallback<P>) => {
				const id = ++idpool;
				const ignore = createIgnore(key, id);

				cache[key] = cache[key] ?? [];
				const observer: Observer<P> = {
					id,
					onChange,
					once,
					ignore,
				};

				cache[key]?.push(observer);

				return () => ignore();
			};
		};

	return {
		state: proxy,
		observe: observe(false),
		observeOnce: observe(true),
		conceal: () => revoke(),
	} as Observable<T>;
}