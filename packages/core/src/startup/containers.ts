import { HttpProvider, IHttpProvider } from '@ui-framework/http';
import { createHttpService } from '@ui-framework/http/fetch';
import { ResponseParsingStrategyFactory } from '@ui-framework/http/fetch/responseParsingStrategies';
import { Container, Lifespan, ReuseScope } from '@ui-framework/ioc';

import { platformFactory } from '../platform/platformFactory';
import { SettingsProvider } from '../settings/SettingsProvider';

const root = new Container();
const configurations = root.spawn('@configurations');
const services = root.spawn('@services');

const readyCallbacks = root.spawn('@readyCallbacks');
const modules = services.spawn('@modules');
const plugins = services.spawn('@plugins');

root.registerFactory('Platform', platformFactory)
	.withLifespan(Lifespan.transient)
	.asDurable()
	.reusedWithin(ReuseScope.container);

root.registerFactory('ISettingsProvider', () => new SettingsProvider(globalThis.__DEBUG__))
	.asDurable();

root.register('IHttpProvider', HttpProvider)
	.asDurable();

root.register('IResponseParsingStrategyFactory', ResponseParsingStrategyFactory,
	['Platform']);

root.registerFactory('IHttpService', async (container) => {
	const provider: IHttpProvider = await container.resolve('IHttpProvider');
	const responseParsingStrategyFactory = await container.resolve('IResponseParsingStrategyFactory');

	return createHttpService(provider, responseParsingStrategyFactory);
}).asDurable();



export {
	configurations,
	modules,
	plugins,
	readyCallbacks,
	root,
	services,
};