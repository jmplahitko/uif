import { Proxify } from './types';

export default class FormProperty<T> {
	readonly name: string;
	public value!: Proxify<T>;
	private _value: T;
	private _isDirty: boolean = false;
	private _originalValue: T;

	constructor(name: string, originalValue: T) {
		this.name = name;
		this._originalValue = this._value = originalValue;

		const self = this;
		Object.defineProperty(this, 'value', {
			get() {
				return self._value;
			},
			set(value: T) {
				self._isDirty = true;
				self._value = value;
			}
		});
	}

	get isDirty() {
		return this._isDirty;
	}

	public reset(pristine: boolean = false) {
		this.value = this._originalValue;
		this._isDirty = pristine ? !pristine : this.isDirty;
	}
}