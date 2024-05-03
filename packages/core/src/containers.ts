import { Container } from '@ui-framework/ioc';

const root = new Container();
const configurations = root.spawn('@configurations');
const services = root.spawn('@services');
const readyCallbacks = root.spawn('@readyCallbacks');


export {
	configurations,
	readyCallbacks,
	root,
	services
};