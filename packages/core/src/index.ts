import observable from '@ui-framework/observable';
import { isEmpty } from '@ui-framework/utils';
import { Validator } from '@ui-framework/validation';

export interface ITestable {
	test(): boolean;
}

console.log(observable({}));
console.log(isEmpty({}));
console.log(new Validator<unknown>());