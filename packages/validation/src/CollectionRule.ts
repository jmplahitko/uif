import Rule from './Rule';
import Severity from './Severity';
import ValidationResult from './ValidationResult';
import ValidationResultList from './ValidationResultList';

import { IValidatable, TCollectionFilter, TSubsetRuleCollection } from './types';

import { isArray } from './utils/quality';

export default class CollectionRule<TParentValue = any, TCustomOptions = any> extends Rule<TParentValue, TCustomOptions> {
	protected subsetRules: TSubsetRuleCollection<TParentValue, TCustomOptions> = new Map();

	public using(validatable: IValidatable<TParentValue, TCustomOptions>): CollectionRule<TParentValue, TCustomOptions> {
		validatable.propertyName = '';

		let meta = {
			name: validatable.propertyName,
			message: () => '',
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this.validators.set(validatable, meta);
		return this;
	}

	public where(filter: TCollectionFilter<TParentValue, TCustomOptions>, define: (rule: Rule<TParentValue, TCustomOptions>) => void): CollectionRule<TParentValue, TCustomOptions> {
		let rule = new Rule<TParentValue, TCustomOptions>('');
		let meta = {
			name: rule.propertyName,
			filter
		};

		define(rule);
		this.subsetRules.set(rule, meta);

		return this;
	}

	protected runSubsetRules(value: any, index: number, collection: [], parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList {
		for (let [rule, meta] of this.subsetRules) {
			if (meta.filter(value, index, collection, parentValue, customOptions)) {
				let resultList = rule.validate(value, parentValue, customOptions);
				results.merge(resultList);
			}
		}

		return results;
	}

	protected getPropertyResults(collection: [], parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList {
		if (isArray(collection)) {
			for (let value of collection) {
				const index = collection.indexOf(value);
				const propertyName = `${this.propertyName}[${index}]`;
				let resultList = new ValidationResultList([], propertyName);
				this.runPredicates(value, parentValue, customOptions, resultList);

				if (resultList.isValid || !this.stopOnFirstFailure) {
					this.runValidators(value, parentValue, customOptions, resultList);

					if (resultList.isValid || !this.stopOnFirstFailure) {
						this.runSubsetRules(value, index, collection, parentValue, customOptions, resultList);
					}
				}

				resultList.forEach((result, ndx) => {
					// a little nasty, but at this time we know the first result in this.results describes the collection itself,
					// and not the values it contains.
					const _propertyName = `${propertyName}${(ndx > 0 && result.propertyName) ? `.${result.propertyName}` : ''}`;
					const cleanedPropertyName = _propertyName.replace(/\]\.\[/g, '][');
					result.propertyName = cleanedPropertyName;
				});

				results = results.merge(resultList);
			}
		} else {
			const result = new ValidationResult(this.propertyName, collection);
			result.errors['beCollection'] = `${this.propertyName} must be a collection.`;
			results.push(result);
		}

		return results;
	}
}