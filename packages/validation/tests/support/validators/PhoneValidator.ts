import { Validator, rx } from '../../../src';
import Phone from '../model/Phone';
import PhoneType from '../model/PhoneType';
import { beBoolean } from '../../../src/utils/predicates';

export default class PhoneValidator extends Validator<Phone> {
	constructor() {
		super();

		this.ruleFor(x => x.type)
		.notEmpty()
		.withMessage(() => 'Type is required.')
		.enum([PhoneType.mobile, PhoneType.work])
		.withMessage(() => 'Type must be "home" or "cell".');

		this.ruleFor(x => x.value)
			.notEmpty()
			.withMessage(() => 'Value is required.')
			.matches(rx.domesticphone)
			.when(phone => phone && !phone.isInternational)
			.withMessage(() => 'Invalid domestic phone number.')
			.matches(rx.foreignphone)
			.when(phone => phone && phone.isInternational)
			.withMessage(() => 'Invalid international phone number.');

		this.ruleFor(x => x.display)
			.notEmpty()
			.withMessage(() => 'Display is required')
			.matches(rx.title)
			.withMessage(() => 'Invalid display value.');

		this.ruleFor(x => x.isInternational)
			.must(beBoolean);
	}
}