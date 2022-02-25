import AddressValidator from './support/validators/AddressValidator';
import { Validator } from '../src';
import { invalidLine1Address } from './support/instances/address';
import Address from './support/model/Address';

// const validator = new AddressValidator();
// const result = validator.validate(invalidLine1Address);

// console.log(result);


class MyValidator extends Validator<Address> {
	constructor() {
		super();

		this.ruleFor(x => x.line1)
			.notEmpty();

		this.ruleFor(x => x.country.toString)
			.notEmpty();
	}
}

const validator = new MyValidator();

const result = validator.validate({});

console.log(result);