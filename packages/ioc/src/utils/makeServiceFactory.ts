import { ServiceFactory, ServiceKey } from '../index';
import { Container } from '../Container';

export default function makeServiceFactory<T>(Ctor: Static<T>, dependencies: ServiceKey[]): ServiceFactory<T> {
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
