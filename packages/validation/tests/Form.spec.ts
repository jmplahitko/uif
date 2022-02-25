import 'jasmine';
import { ValidationResult, ValidationResultList } from '../src';

import Form from '../src/forms/Form';
import { invalidPhoneContact, validContact } from './support/instances/contact';
import { validOrder1 } from './support/instances/order';
import Customer from './support/model/Customer';
import CustomerValidator from './support/validators/CustomerValidator';
import PartialCustomerValidator from './support/validators/PartialCustomerValidator';

describe('Form#constructor', () => {

	it('should set data properties set to defaults for each property on object passed', () => {
		let customerForm = new Form<Customer>({ companyName: null, orders: [], contact: null });

		expect(customerForm.data.companyName).toBeNull();
		expect(customerForm.data.orders).toEqual([]);
		expect(customerForm.data.contact).toBeNull();
	});

	it('should set a validator if passed', () => {
		let customerValidator = new CustomerValidator();
		let customerForm = new Form<Customer>({ companyName: null, orders: [], contact: null }, customerValidator);

		expect(customerForm.validator).toBe(customerValidator);
	});

	it('should set custom validation options if passed', () => {
		let customerValidator = new CustomerValidator();
		let customOptions = { test: 'test' };
		let customerForm = new Form<Customer>({ companyName: null, orders: [], contact: null }, customerValidator, customOptions);

		expect(customerForm.customValidationOptions).toBe(customOptions);
	});

	it('should set form\'s name and debounce if form options are passed', () => {
		let name = 'customerForm';
		let debounce = 300;
		let customerValidator = new CustomerValidator();
		let customOptions = { test: 'test' };
		let formOptions = { name, debounce };
		let customerForm = new Form<Customer>({ companyName: null, orders: [], contact: null }, customerValidator, customOptions, formOptions);

		expect(customerForm.name).toBe(name);
		expect(customerForm.debounce).toBe(debounce);
	});
});

describe('Form#onValidate', () => {
	let customerValidator = new PartialCustomerValidator();
	let customerForm = new Form<Customer>({ companyName: null, orders: [], contact: null }, customerValidator);
	let onValidateSpy = jasmine.createSpy();
	customerForm.onValidated(onValidateSpy);

	it('should notify listeners when form is validated', () => {
		let result = customerForm.validate();
		expect(onValidateSpy).toHaveBeenCalledWith(result);
	});
});

describe('Form#reset', () => {
	let customerValidator = new PartialCustomerValidator();
	let companyName = null, orders = [], contact = null;
	let customerForm = new Form<Customer>({ companyName, orders, contact }, customerValidator);

	it('should reset all form properties to original values', () => {
		customerForm.data.companyName = 'test';
		customerForm.data.orders = [validOrder1];
		customerForm.data.contact = validContact;

		customerForm.reset();

		expect(customerForm.data.companyName).toBeNull();
		expect(customerForm.data.orders).toBe(orders);
		expect(customerForm.data.contact).toBeNull();
	});


	it('should reset isDirty on each property and form when "true" is passed', () => {
		customerForm.data.companyName = 'test';
		customerForm.data.orders = [validOrder1];
		customerForm.data.contact = validContact;

		expect(customerForm.isDirty).toBeTrue();

		customerForm.reset(true);

		expect(customerForm.isDirty).toBeFalse();
	});
});

describe('Form#setValidationResults', () => {
	it('should merge validation results with existing results', () => {
		let customerValidator = new CustomerValidator();
		let companyName = null, orders = [validOrder1], contact = null;
		let customerForm = new Form<Customer>({ companyName, orders, contact }, customerValidator);
		let existingResult = customerForm.validate().toObject();
		let results = [new ValidationResult('contact', validContact)];
		let mergedResult = customerForm.setValidationResults(results).toObject();

		expect(mergedResult.companyName).toBe(existingResult.companyName);
		expect(mergedResult['orders[0]']).toBe(existingResult['orders[0]']);
		expect(mergedResult.contact).not.toBe(existingResult.contacts);
	});
});

describe('Form#validate', () => {

	it('should return a validation result', () => {
		let customerValidator = new CustomerValidator();
		let companyName = null, orders = [], contact = null;
		let customerForm = new Form<Customer>({ companyName, orders, contact }, customerValidator);
		let result = customerForm.validate();

		expect(result).toBeInstanceOf(ValidationResultList);
	});

	it('should provide updated results after properties change', () => {
		let customerValidator = new CustomerValidator();
		let companyName = null, orders = [], contact = null;
		let customerForm = new Form<Customer>({ companyName, orders, contact }, customerValidator);
		let result1 = customerForm.validate().toObject();

		customerForm.data.orders.push(validOrder1);

		let result2 = customerForm.validate().toObject();

		expect(result1.companyName).toEqual(jasmine.objectContaining(result2.companyName));
		expect(result1.contact).toEqual(jasmine.objectContaining(result2.contact));
		expect(result1['orders[0]']).not.toEqual(jasmine.objectContaining(result2['orders[0]']));
	});

	it('should accurately update isValid', () => {
		let customerValidator = new CustomerValidator();
		let companyName = null, orders = [], contact = null;
		let customerForm = new Form<Customer>({ companyName, orders, contact }, customerValidator);

		customerForm.validate();
		expect(customerForm.isValid).toBeFalse();

		customerForm.data.companyName = 'test';
		customerForm.validate();
		expect(customerForm.isValid).toBeFalse();

		customerForm.data.orders.push(validOrder1);
		customerForm.validate();
		expect(customerForm.isValid).toBeFalse();

		customerForm.data.contact = invalidPhoneContact;
		customerForm.validate();
		expect(customerForm.isValid).toBeFalse();

		customerForm.data.contact = validContact;
		customerForm.validate();
		expect(customerForm.isValid).toBeTrue();
	});
});