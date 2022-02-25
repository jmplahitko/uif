import Rule from './Rule';
import Severity from './Severity';

import { IValidatable, TMessageFactory, TValidatableMetadata, TPrecondition, TPredicate } from './types';

export default class RuleApi<TParentValue, TCustomOptions> {
	protected rule: Rule<TParentValue, TCustomOptions>;
	protected meta: TValidatableMetadata<TParentValue, TCustomOptions>;

	constructor(validatable: Rule<TParentValue, TCustomOptions>, meta: TValidatableMetadata<TParentValue, TCustomOptions>) {
		this.rule = validatable;
		this.meta = meta;
	}

	public enum(allowedValues: Array<string|number>) {
		return this.rule.enum(allowedValues);
	}

	public if(precondition: TPrecondition<TParentValue, TCustomOptions>, define: (rule: Rule<TParentValue, TCustomOptions>) => void): Rule<TParentValue, TCustomOptions> {
		return this.rule.if(precondition, define);
	}

	public length(min: number, max: number): RuleApi<TParentValue, TCustomOptions> {
		return this.rule.length(min, max);
	}

	public lengthOrEmpty(min: number, max: number): RuleApi<TParentValue, TCustomOptions> {
		return this.rule.lengthOrEmpty(min, max)
	}

	public matches(rx: RegExp): RuleApi<TParentValue, TCustomOptions> {
		return this.rule.matches(rx);
	}

	public max(num: number): RuleApi<TParentValue, TCustomOptions> {
		return this.rule.max(num);
	}

	public maxExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions> {
		return this.rule.maxExclusiveOf(num);
	}

	public min(num: number): RuleApi<TParentValue, TCustomOptions> {
		return this.rule.min(num);
	}

	public minExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions> {
		return this.rule.minExclusiveOf(num);
	}

	public must(predicate: TPredicate<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions> {
		return this.rule.must(predicate);
	}

	public notNull(): RuleApi<TParentValue, TCustomOptions> {
		return this.rule.notNull();
	}

	public notEmpty(): RuleApi<TParentValue, TCustomOptions> {
		return this.rule.notEmpty();
	}

	public cascade(): void {
		return this.rule.cascade();
	}

	public using(validatable: IValidatable) {
		return this.rule.using(validatable);
	}

	public as(predicateName: string): RuleApi<TParentValue, TCustomOptions> {
		this.meta.name = predicateName;
		return this;
	}

	public asWarning(): RuleApi<TParentValue, TCustomOptions> {
		this.meta.severity = Severity.warning;
		return this;
	}

	public when(precondition: TPrecondition<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions> {
		this.meta.precondition = precondition;
		return this;
	}

	public withMessage(message: TMessageFactory<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions> {
		this.meta.message = message;
		return this;
	}
}