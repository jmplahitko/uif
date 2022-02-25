import { Validator, rx } from '../../../src';
import Address from '../model/Address';

export default class AddressValidator extends Validator<Address> {
	constructor() {
		super();

		this.ruleFor(x => x.line1)
			.notEmpty()
			.withMessage(() => 'Line 1 is required.')
			.matches(rx.address)
			.withMessage(() => 'Invalid address line.');

		this.ruleFor(x => x.line2)
			.matches(rx.address)
			.withMessage(() => 'Invalid address line.');

		this.ruleFor(x => x.city)
			.notEmpty()
			.withMessage(() => 'City is required.')
			.matches(rx.city)
			.withMessage(() => 'Invalid City.');

		this.ruleFor(x => x.region)
			.notEmpty()
			.when((x) => x?.country === 'USA' || x?.country === 'Canada')
			.withMessage(() => 'Region is required when country is USA or Canada.');

		this.ruleFor(x => x.postalCode)
			.notEmpty()
			.withMessage(() => 'Postal code is required.')
			.matches(rx.zipcode)
			.withMessage(() => 'Invalid postal code.');

		this.ruleFor(x => x.country)
			.notEmpty()
			.withMessage(() => 'Country is required.');
	}
}