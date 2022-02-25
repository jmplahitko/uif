import { Rule, rx } from '../../../../src'

export default class PositiveNumberRule extends Rule {
	constructor(propertyName?: string, displayPropertyName?: string) {
		super(propertyName);

		this
			.min(1)
			.withMessage(() => `${displayPropertyName || this.propertyName} must be positive.`);
	}
}