import 'jasmine';
import { FormProperty } from '../src';

describe('FormProperty.value', () => {
	const formProperty = new FormProperty<string>('myString', 'test');

	it('should be dirty when set', () => {
		expect(formProperty.isDirty).toBeFalse();

		formProperty.value = 'test1';

		expect(formProperty.isDirty).toBeTrue();
	});
});

describe('FormProperty#reset', () => {
	const originalValue = 'test';
	const formProperty = new FormProperty<string>('myString', originalValue);

	it('should set its value to its original value', () => {
		formProperty.value = 'test1';
		formProperty.reset();

		expect(formProperty.value).toBe(originalValue);
	});

	it('should reset isDirty when "true" is passed', () => {
		formProperty.value = 'test1';

		expect(formProperty.isDirty).toBeTrue();

		formProperty.reset(true);

		expect(formProperty.isDirty).toBeFalse();
	});
});