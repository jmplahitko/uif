import { HttpProvider, IHttpProvider } from '@ui-framework/http';
import { createHttpService } from '@ui-framework/http/fetch';
import { ResponseParsingStrategyFactory } from '@ui-framework/http/fetch/responseParsingStrategies';
import { Container, Lifespan, ReuseScope } from '@ui-framework/ioc';

import { platformFactory } from '../platform/platformFactory';
import { createSettingsProvider } from '../settings/createSettingsProvider';
import { settingsFactory } from '../settings/settingsFactory';

const root = new Container();
const configurations = root.spawn('@configurations');
const services = root.spawn('@services');

const readyCallbacks = root.spawn('@readyCallbacks');
const modules = services.spawn('@modules');
const plugins = services.spawn('@plugins');

/** root dependencies */
root.registerFactory('Platform', platformFactory)
	.asDurable()
	.reusedWithin(ReuseScope.container)
	.withLifespan(Lifespan.transient);

root.register('ISettingsProvider', createSettingsProvider)
	.asDurable();

root.register('IHttpProvider', HttpProvider)
	.asDurable();

root.register('IResponseParsingStrategyFactory', ResponseParsingStrategyFactory)
	.reusedWithin(ReuseScope.container)
	.withLifespan(Lifespan.transient);

// We store these services in root because we want to use it during bootstrapping, and services will not
// be available at that time.
root.register('IHttpService', createHttpService)
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