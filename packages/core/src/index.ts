/**
 * This is just temporary stuff to test importing and bundling.
 */

import { Container } from '@ui-framework/ioc';
import { HttpMethod, HttpProvider, createHttpRequestFactory, HttpRequestFactoryInput } from '@ui-framework/http';
import { createHttpService } from '@ui-framework/http/fetch';
import { ResponseParsingStrategyFactory } from '@ui-framework/http/fetch/responseParsingStrategies';
import observable from '@ui-framework/observable';
import { isEmpty } from '@ui-framework/utils';
import { Validator } from '@ui-framework/validation';
import { EventBus } from '@ui-framework/eventing';
import { NavigationProvider } from '@ui-framework/navigation';

export interface ITestable {
	test(): boolean;
}

console.log(observable({}));
console.log(isEmpty({}));
console.log(new Validator<unknown>());

const container = new Container();
container.register('myValidator', Validator);
container.register('myEvents', EventBus);
container.register('myNavigationProvider', NavigationProvider);


///// http
class GetMe {};
class SaveMe {};
const httpProvider = new HttpProvider();
httpProvider.routes
	.set(GetMe, ['/me', HttpMethod.get])
	.set(SaveMe, ['/me', HttpMethod.put]);

const responseParsingStrategyFactory = new ResponseParsingStrategyFactory({
	name: 'chrome',
	version: '81',
	os: 'Mac OS',
	type: 'browser'
});

const httpService = createHttpService(httpProvider, responseParsingStrategyFactory);
const httpRequestFactory = createHttpRequestFactory(httpProvider);

const request = httpRequestFactory<GetMe>({
	model: GetMe,
	data: {}
});

console.log(request);

if (request) {
	httpService(request);
}