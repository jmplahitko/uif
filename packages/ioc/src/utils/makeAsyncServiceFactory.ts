import { AsyncServiceFactory } from '../index';
import { Container } from '../Container';

export default function makeAsyncServiceFactory<T>(Ctor: Static<T>, dependencies: (string|symbol)[]): AsyncServiceFactory<T> {
	return function(container: Container) {
		return new Promise((resolve, reject) => {
			try {
				container.resolveList(dependencies).then(deps => {
					let instance = new Ctor(...deps);

					resolve(instance);
				});
			} catch(e) {
				reject(e);
			}
		});
	};
}
