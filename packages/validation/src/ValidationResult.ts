import ValidationResultList from './ValidationResultList';

import { isEmpty, isEqual } from './utils/quality';
import { TValidationResultMergeOptions } from './types';
import { copy } from '@ui-framework/utils';

export default class ValidationResult {
	public errors: { [predicateName: string]: string } = {};
	public warnings: { [predicateName: string]: string } = {};
	public propertyName: string;
	public value: any;

	constructor(propertyName: string, value?: any) {
		this.propertyName = propertyName;
		this.value = value;
	}

	public get isValid(): boolean {
		return isEmpty(this.errors);
	}

	public get errorCount(): number {
		return Object.keys(this.errors).length;
	}

	public get warningCount(): number {
		return Object.keys(this.warnings).length;
	}

	public merge(result: ValidationResult): ValidationResult {
		return ValidationResult.merge(this, result);
	}

	public toValidationResultList(): ValidationResultList {
		return new ValidationResultList([this], this.propertyName, this.value);
	}

	static merge(dest: ValidationResult, src: ValidationResult, options: TValidationResultMergeOptions = { useSourceValue: false }): ValidationResult {
		if (dest !== src) {
			dest.errors = { ...dest.errors, ...src.errors };
			dest.warnings = { ...dest.warnings, ...src.warnings };
		}

		if (!isEqual(dest.value, src.value) && options.useSourceValue) {
			dest.value = copy(src.value);
		}

		return dest;
	}
}