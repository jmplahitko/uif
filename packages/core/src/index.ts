/**
 * This is just temporary stuff to test importing and bundling.
 */

import { Container } from '@ui-framework/ioc';
import observable from '@ui-framework/observable';
import { isEmpty } from '@ui-framework/utils';
import { Validator } from '@ui-framework/validation';

export interface ITestable {
	test(): boolean;
}

console.log(observable({}));
console.log(isEmpty({}));
console.log(new Validator<unknown>());

const container = new Container();
container.register('myValidator', Validator);