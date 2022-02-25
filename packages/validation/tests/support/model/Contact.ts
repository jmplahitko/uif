import Phone from './Phone';
import Address from './Address';

export default class Contact {
	firstName!: string;
	middleName?: string;
	lastName!: string;
	title!: string;
	phone!: Phone[];
	address!: Address;
}