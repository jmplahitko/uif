
import Rule from './Rule';
import Severity from './Severity';
import ValidationResultList from './ValidationResultList'

export interface IValidatable<TParentValue = any, TCustomOptions = any> {
	propertyName?: string;
	validate(value: any, parentValue?: TParentValue, customOptions?: TCustomOptions): ValidationResultList;
}

export type TSelector<T> = (src: T) => any;

export type TCollectionFilter<TParentValue, TCustomOptions> = (value: any, index: number, collection: Array<any>, parentValue: TParentValue, customOptions: TCustomOptions) => boolean;

export type TErrorCollection = {
	[ruleName: string]: string;
};

export type TMessageFactory<TParentValue = any, TCustomOptions = any> = (value: any, parentValue: TParentValue, customOptions: TCustomOptions) => string;

export type TValidatableMetadata<TParentValue = any, TCustomOptions = any> = {
	name: string;
	message: TMessageFactory<TParentValue, TCustomOptions>;
	precondition: TPrecondition<TParentValue, TCustomOptions> | null;
	isValidIfEmpty: boolean;
	severity: Severity;
};

export type TValidationResultMergeOptions = {
	useSourceValue: boolean;
}

export type TPrecondition<TParentValue = any, TCustomOptions = any> = (parentValue: TParentValue, customOptions: TCustomOptions) => boolean;

export type TPredicate<TParentValue = any, TCustomOptions = any> = (value: any, parentValue: TParentValue, customOptions: TCustomOptions) => boolean;

export type TPredicateCollection<TParentValue, TCustomOptions> = Map<TPredicate<TParentValue, TCustomOptions>, TValidatableMetadata<TParentValue, TCustomOptions>>;

export type TRuleCollection<TParentValue, TCustomOptions> = { [ruleName: string]: Array<Rule<TParentValue, TCustomOptions>> };

export type TSubsetRuleCollection<TParentValue, TCustomOptions> = Map<IValidatable<TParentValue, TCustomOptions>, TSubsetRuleMetadata<TParentValue, TCustomOptions>>;

export type TSubsetRuleMetadata<TParentValue = any, TCustomOptions = any> = {
	name: string,
	filter: TCollectionFilter<TParentValue, TCustomOptions>
}

export type TValidatorCollection<TParentValue, TCustomOptions> = Map<IValidatable<TParentValue, TCustomOptions>, TValidatableMetadata<TParentValue, TCustomOptions>>;