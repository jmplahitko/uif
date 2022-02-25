import Contact from '../model/Contact';
import { validMobilePhone, validWorkPhone, invalidTypePhone } from './phone';
import { validAddress } from './address';

export const validContact: Contact = {
	firstName: 'Michael',
	lastName: 'Allen',
	title: 'Sales Representative',
	phone: [
		validMobilePhone,
		validWorkPhone
	],
	address: validAddress,
};

export const invalidPhoneContact: Contact = {
	firstName: 'Michael',
	lastName: 'Allen',
	title: 'Sales Representative',
	phone: [
		invalidTypePhone,
		validMobilePhone
	],
	address: validAddress,
}