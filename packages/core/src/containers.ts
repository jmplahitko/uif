import { HttpProvider } from '@ui-framework/http';
import { createHttpService } from '@ui-framework/http/fetch';
import { Container, Lifespan, ReuseScope } from '@ui-framework/ioc';

import { createSettingsProvider } from './plugins/settings/createSettingsProvider';
import { settingsFactory } from './plugins/settings/settingsFactory';

const root = new Container();
const configurations = root.spawn('@configurations');
const services = root.spawn('@services');

const readyCallbacks = root.spawn('@readyCallbacks');
const modules = services.spawn('@modules');
const plugins = services.spawn('@plugins');

/** root dependencies */
root.register('ISettingsProvider', createSettingsProvider)
	.asDurable();

root.register('IHttpProvider', HttpProvider)
	.asDurable();

// We store these services in root because we want to use it during bootstrapping, and services will not
// be available at that time.
root.register('IHttpService', createHttpService, ['IHttpProvider'])
	.asDurable();

/** service dependencies */
services.register('Settings', settingsFactory)
	.asDurable()
	.reusedWithin(ReuseScope.container)
	.withLifespan(Lifespan.transient);

export {
	configurations,
	modules,
	plugins,
	readyCallbacks,
	root,
	services,
};