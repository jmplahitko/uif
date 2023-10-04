import { Container, ServiceKey } from '@ui-framework/ioc/.';

export const setupResolver = (container: Container, ) =>
	(...keys: ServiceKey[]): Promise<any[]> => {
		return container.resolveList(keys);
	}