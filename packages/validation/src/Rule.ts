import RuleApi from './RuleApi';
import Severity from './Severity';
import ValidationResult from './ValidationResult';
import ValidationResultList from './ValidationResultList';

import { IValidatable, TPrecondition, TPredicate, TPredicateCollection, TValidatorCollection } from './types';

import { copy } from '@ui-framework/utils';
import { length, match, max, min, notEmpty, notNull, beValidEnum } from './utils/predicates';
import { isEmpty, isNull } from './utils/quality';

export default class Rule<TParentValue = any, TCustomOptions = any> implements IValidatable<TParentValue, TCustomOptions> {
	public propertyName: string;
	protected predicates: TPredicateCollection<TParentValue, TCustomOptions> = new Map();
	protected validators: TValidatorCollection<TParentValue, TCustomOptions> = new Map();
	protected stopOnFirstFailure: boolean = true;

	constructor(propertyName?: string) {
		this.propertyName = propertyName || '';
	}

	get isEmpty() {
		return this.predicates.size === 0 && this.validators.size === 0;
	}

	public enum(allowedValues: Array<string|number>): RuleApi<TParentValue, TCustomOptions> {
		let beEnumeratedValue = beValidEnum(allowedValues);

		let meta = {
			name: `beEnumeratedValue`,
			message: () =>  `${this.propertyName} must be one of the following: "${allowedValues.join(', ')}".`,
			precondition: null,
			isValidIfEmpty: true,
			severity: Severity.default
		};

		this.predicates.set(beEnumeratedValue, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public length(min: number, max: number): RuleApi<TParentValue, TCustomOptions> {
		let beBetween = length(min, max);
		let meta = {
			name: `beBetween${min}and${max}`,
			message: () =>  `${this.propertyName} must be between ${min} and ${max}.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.predicates.set(beBetween, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public lengthOrEmpty(min: number, max: number): RuleApi<TParentValue, TCustomOptions> {
		let beBetween = length(min, max);
		let meta = {
			name: `beBetween${min}and${max}OrEmpty`,
			message: () =>  `${this.propertyName} must be between ${min} and ${max}.`,
			precondition: null,
			isValidIfEmpty: true,
			severity: Severity.default
		};

		this.predicates.set(beBetween, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public matches(rx: RegExp): RuleApi<TParentValue, TCustomOptions> {
		let matches = match(rx);
		let matchRx = (val: any) => isNull(val) || matches(val);
		let meta = {
			name: matchRx.name,
			message: () =>  `${this.propertyName} is an invalid format.`,
			precondition: null,
			isValidIfEmpty: true,
			severity: Severity.default
		};

		this.predicates.set(matchRx, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public notNull(): RuleApi<TParentValue, TCustomOptions> {
		let meta = {
			name: notNull.name,
			message: () =>  `${this.propertyName} cannot be null.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.predicates.set(notNull, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public notEmpty(): RuleApi<TParentValue, TCustomOptions> {
		let meta = {
			name: notEmpty.name,
			message: () =>  `${this.propertyName} cannot be empty.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.predicates.set(notEmpty, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public max(num: number): RuleApi<TParentValue, TCustomOptions> {
		let beLessThanOrEqual = max(num);

		let meta = {
			name: 'beLessThanOrEqual',
			message: () =>  `${this.propertyName} cannot be greater than or equal to ${num}.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.predicates.set(beLessThanOrEqual as TPredicate, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public maxExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions> {
		let beLessThan = max(num - 1);

		let meta = {
			name: 'beLessThan',
			message: () =>  `${this.propertyName} cannot be greater than ${num}.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.predicates.set(beLessThan as TPredicate, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public min(num: number): RuleApi<TParentValue, TCustomOptions> {
		let beGreaterThanOrEqual = min(num);

		let meta = {
			name: 'beGreaterThanOrEqual',
			message: () =>  `${this.propertyName} cannot be less than or equal to ${num}.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.predicates.set(beGreaterThanOrEqual as TPredicate, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public minExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions> {
		let beGreaterThan = min(num + 1);

		let meta = {
			name: 'beGreaterThan',
			message: () =>  `${this.propertyName} cannot be less than ${num}.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.predicates.set(beGreaterThan as TPredicate, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public must(predicate: TPredicate<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions> {
		let meta = {
			name: predicate.name,
			message: () =>  `${this.propertyName} is invalid.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.predicates.set(predicate, meta);

		return new RuleApi<TParentValue, TCustomOptions>(this, meta);
	}

	public cascade(): void {
		this.stopOnFirstFailure = false;
	}

	public using(validatable: IValidatable<TParentValue, TCustomOptions>): Rule {
		validatable.propertyName = this.propertyName || validatable.propertyName || '';

		let meta = {
			name: validatable.propertyName,
			message: () =>  '',
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.validators.set(validatable, meta);
		return this;
	}

	public if(precondition: TPrecondition<TParentValue, TCustomOptions>, define: (rule: Rule<TParentValue, TCustomOptions>) => void): Rule {
		let rule = new Rule(this.propertyName);
		let meta = {
			name: rule.propertyName,
			message: () =>  '',
			precondition,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.validators.set(rule, meta);
		define(rule);

		return this;
	}

	protected runPredicates(propValue: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList {
		const result = new ValidationResult(this.propertyName, propValue);

		for (let [predicate, meta] of this.predicates) {
			// We check if we should run the validator based on whether the property has a value
			if (isEmpty(propValue) && meta.isValidIfEmpty) {
				continue;
			}

			// We check for a precondition to exist for a predicate before calling it
			if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
				let isValid = predicate(propValue, parentValue, customOptions);

				if (!isValid) {
					if (meta.severity === Severity.error) {
						result.errors[meta.name] = meta.message(propValue, parentValue, customOptions);

						// Short-circuit if we have to stopOnFirstFailure
						if (this.stopOnFirstFailure) {
							break;
						}
					} else {
						result.warnings[meta.name] = meta.message(propValue, parentValue, customOptions);
					}
				}
			}
		}

		results.push(result);

		return results;
	}

	protected runValidators(propValue: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList {
		for (let [validator, meta] of this.validators) {
			if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
				let _resultList: ValidationResultList = validator.validate(propValue, parentValue, customOptions);
				results = results.merge(_resultList);

				if (!results.isValid && this.stopOnFirstFailure) {
					break;
				}
			}
		}

		return results;
	}

	protected getPropertyResults(value: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList {
		results = this.runPredicates(value, parentValue, customOptions, results);

		if (results.isValid || !this.stopOnFirstFailure) {
			results = this.runValidators(value, parentValue, customOptions, results);
		}

		return results;
	}

	public validate(value: any, parentValue?: TParentValue, customOptions?: TCustomOptions): ValidationResultList {
		value = copy(value);
		parentValue = copy(parentValue);

		let results = new ValidationResultList([], this.propertyName, value);

		return this.getPropertyResults(value, parentValue, customOptions, results);

	}
}