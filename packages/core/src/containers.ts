import { Container } from '@ui-framework/ioc';
import { setupResolver } from './startup/_internal/setupResolver';

const root = new Container();
const configurations = root.spawn('@configurations');
const services = root.spawn('@services');
const readyCallbacks = root.spawn('@readyCallbacks');

const use = setupResolver(services);

export {
	configurations,
	readyCallbacks,
	root,
	services,
	use
};