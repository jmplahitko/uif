import Customer from '../model/Customer';
import { validOrder1, validOrder2 } from './order';
import { validContact, invalidPhoneContact } from './contact';

export const validCustomer: Customer = {
	companyName: 'Customer NRZBB',
	contact: validContact,
	orders: [
		validOrder1,
		validOrder2
	]
};

export const invalidPhoneContactCustomer: Customer = {
	companyName: 'Customer NRZBB',
	contact: invalidPhoneContact,
	orders: [
		validOrder1,
		validOrder2
	]
};