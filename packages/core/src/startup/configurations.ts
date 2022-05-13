import { InjectableFactory } from '@ui-framework/ioc';
import { v4 as uuid } from 'uuid';
import { configurations } from '../containers';

export function register(fn: InjectableFactory<void>) {
	configurations.register(uuid(), fn);
};

export async function init() {
	const fns = await configurations.resolveAll();
	return await Promise.all(Object.values(fns));
}