import { Container } from '@ui-framework/ioc';

const root = new Container();
const configurations = root.spawn('@configurations');
const services = root.spawn('@services');

const readyCallbacks = root.spawn('@readyCallbacks');
const modules = services.spawn('@modules');
const plugins = services.spawn('@plugins');

export {
	configurations,
	modules,
	plugins,
	readyCallbacks,
	root,
	services
};