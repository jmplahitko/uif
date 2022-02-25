import { Validator, rx } from '../../../src';
import Customer from '../model/Customer';

export default class PartialCustomerValidator extends Validator<Customer> {
	constructor() {
		super();

		this.ruleFor(x => x.companyName)
			.notEmpty()
			.withMessage(() => 'Company name is required')
			.matches(rx.fullname);
	}
}