import { copy } from '@ui-framework/utils';

export default function normalizeValidateArgs<TParentValue, TCustomOptions>(value: any, parentValue?: any, customOptions?: any): [any, TParentValue, TCustomOptions] {
	const _value = copy(value);
	const _parentValue = value;
	let _customOptions;

	if (arguments[3] !== undefined) {
		_customOptions = customOptions;
	} else {
		_customOptions = parentValue;
	}

	return [_value, _parentValue, _customOptions];
}