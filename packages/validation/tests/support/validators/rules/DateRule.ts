import { Rule, rx } from '../../../../src'

export default class DateRule extends Rule {
	constructor() {
		super()

		this
			.matches(rx.iso8601)
			.withMessage(() => 'Invalid date format.');
	}
}