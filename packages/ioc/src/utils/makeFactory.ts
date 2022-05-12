import { InjectableFactory, ServiceFactory, ServiceKey } from '../index';
import { Container } from '../Container';

export default function makeFactory<T>(factory: InjectableFactory<T>, dependencies: ServiceKey[] = factory.$inject ?? []): ServiceFactory<T> {
	return function(container: Container) {
		return new Promise(async (resolve, reject) => {
			try {
				const deps = await container.resolveList(dependencies);
				const instance = await factory(...deps);

				resolve(instance);
			} catch(e) {
				reject(e);
			}
		});
	};
}
