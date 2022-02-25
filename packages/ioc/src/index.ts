import { Container } from './Container';
import { ServiceEntryDisposalBroker } from './ServiceEntryDisposalBroker';

export type DisposalStrategy<T> = (serviceEntry: ServiceEntryDisposalBroker) => void;
export type ServiceFactory<T> = (container: Container) => T;
export type AsyncServiceFactory<T> = (container: Container) => Promise<T>;
export type ServiceFactoryCreator<T> = (type: Static<T>, deps: string[]) => ServiceFactory<T>;

export { Container } from './Container';
export { Lifespan } from './Lifespan';
export { ReuseScope } from './ReuseScope';