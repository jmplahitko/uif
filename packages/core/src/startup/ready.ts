import { InjectableFactory } from '@ui-framework/ioc';
import { v4 as uuid } from 'uuid';
import { readyCallbacks } from '../containers';

export function register(fn: InjectableFactory<void>) {
	readyCallbacks.register(uuid(), fn);
};

export async function init() {
	const fns = await readyCallbacks.resolveAll();
	return await Promise.all(Object.values(fns));
}