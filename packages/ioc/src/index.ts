import { Container } from './Container';
import { ServiceEntryDisposalBroker } from './ServiceEntryDisposalBroker';

export type DisposalStrategy<T> = (serviceEntry: ServiceEntryDisposalBroker) => void;
export type ServiceFactory<T> = (container: Container) => Promise<T>|T;
export type ServiceKey = string | symbol;
export type InjectableStatic<T> = Static<T> & { $inject?: ServiceKey[] };
export type InjectableFactory<T> = {
	(...services: any[]): (Promise<T>|T);
	$inject?: ServiceKey[];
};
export type Injectable<T> = InjectableStatic<T> | InjectableFactory<T>;
export type ServiceFactoryCreator<T> = (type: Static<T>, deps: string[]) => ServiceFactory<T>;

export { Container } from './Container';
export { Lifespan } from './Lifespan';
export { ReuseScope } from './ReuseScope';