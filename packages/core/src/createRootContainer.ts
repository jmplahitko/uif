import { HttpProvider, IHttpProvider } from '@ui-framework/http';
import { createHttpService } from '@ui-framework/http/fetch';
import { ResponseParsingStrategyFactory } from '@ui-framework/http/fetch/responseParsingStrategies';
import { Container, Lifespan, ReuseScope } from '@ui-framework/ioc';
import { platformFactory } from './platform/platformFactory';
import { SettingsProvider } from './settings/SettingsProvider';

export function createRootContainer(debug: boolean) {
	const rootContainer = new Container();

	rootContainer.registerFactory('Platform', platformFactory)
		.withLifespan(Lifespan.transient)
		.asDurable()
		.reusedWithin(ReuseScope.container);

	rootContainer.registerFactory('ISettingsProvider', () => new SettingsProvider(debug))
		.asDurable();

	rootContainer.register('IHttpProvider', HttpProvider)
		.asDurable();

	rootContainer.register('IResponseParsingStrategyFactory', ResponseParsingStrategyFactory,
		['Platform']);

	rootContainer.registerFactory('IHttpService', async (container) => {
		const provider: IHttpProvider = await container.resolve('IHttpProvider');
		const responseParsingStrategyFactory = await container.resolve('IResponseParsingStrategyFactory');

		return createHttpService(provider, responseParsingStrategyFactory);
	})
		.asDurable();

	return rootContainer;
}