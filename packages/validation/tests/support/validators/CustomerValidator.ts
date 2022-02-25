import ContactValidator from './ContactValidator';
import OrderValidator from './OrderValidator';
import PartialCustomerValidator from './PartialCustomerValidator';

export default class CustomerValidator extends PartialCustomerValidator {
	constructor() {
		super();

		this.ruleFor(x => x.contact)
			.using(new ContactValidator());

		this.ruleForEach(x => x.orders)
			.using(new OrderValidator());
	}
}