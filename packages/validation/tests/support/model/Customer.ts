import Address from './Address';
import Contact from './Contact';
import Order from './Order';

export default class Customer {
	public companyName!: string;
	public contact!: Contact;
	public orders!: Order[];
}