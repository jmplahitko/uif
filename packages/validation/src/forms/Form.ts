import { EventEmitter } from 'events';
import Validator from '../Validator';
import ValidationResultList from '../ValidationResultList';
import ValidationResult from '../ValidationResult';
import { isEmpty } from '../utils/quality';
import FormProperty from './FormProperty';
import { FormOptions, InitialFormData } from './types';

export default class Form<T> {
	private _properties: Partial<{ [K in keyof T]: FormProperty<T[K]> }> = {};
	private _propertyDebounces: Partial<{ [K in keyof T]: ReturnType<typeof setTimeout> }> = {};
	private _forms: Partial<{ [K in keyof T]: FormProperty<T[K]> }> = {};
	private _emitter: EventEmitter = new EventEmitter();
	private _name: string = '';

	public customValidationOptions?: any;
	public data: T = <T>{};
	public debounce: number = 275;
	public validationResults!: ValidationResultList;
	public validator: Validator<T>;

	constructor(data: InitialFormData<T>, validator?: Validator<T>, customValidationOptions?: any, options?: FormOptions) {
		this.validator = validator || new Validator<T>();
		this.validationResults = new ValidationResultList([], '', data);
		this.customValidationOptions = customValidationOptions;

		this.name = options?.name || this.name;
		this.debounce = options?.debounce || this.debounce;

		Object.keys(data).forEach((key) => {
			const self = this;

			if (data[key] instanceof Form) {
				const form = <Form<any>>data[key as keyof T];
				form.name = key;

				form.onValidated((results) => {
					self._mergeValidationResults(results);
				});

				self._forms[key] = form;

				Object.defineProperty(self.data, key, {
					enumerable: true,
					configurable: false,
					get() {
						return self._forms[key].data;
					},
				});
			} else {
				this._properties[key] = new FormProperty<any>(key, data[key]);

				Object.defineProperty(self.data, key, {
					enumerable: true,
					configurable: false,
					get() {
						return self._properties[key].value;
					},
					set(value: any) {
						self._properties[key].value = value;
						if (!self._propertyDebounces[key]) {
							self._propertyDebounces[key] = setTimeout(() => {
								if (self.validator.hasRuleFor(key)) {
									const results = self.validator.validateProperty(key, self.data, self.customValidationOptions);
									self._mergeValidationResults(results);
								}
								delete self._propertyDebounces[key];
							}, self.debounce);
						}
					}
				});
			}
		});
	}

	get name() {
		return this._name;
	}

	set name(name: string) {
		this._name = name;
		this.validator.propertyName = name;
		this.validationResults.propertyName = name;
	}

	get errors(): { [propertyName: string]: ValidationResult } {
		return this.validationResults.withErrors.toObject();
	}

	get isValid(): boolean {
		return this.validationResults.isValid !== false;
	}

	get isDirty(): boolean {
		return !!Object.values<Form<any> | FormProperty<any>>({ ...this._properties, ...this._forms }).find(property => property.isDirty);
	}

	get warnings(): { [propertyName: string]: ValidationResult } {
		return this.validationResults.withWarnings.toObject();
	}

	public onValidated(listener: (validationResults: ValidationResultList) => void): () => void {
		this._emitter.on('validated', listener);
		return () => {
			this._emitter.off('validated', listener);
		}
	}

	public reset(pristine: boolean = false) {
		Object.keys(this._properties).forEach(key => {
			this._properties[key].reset(pristine);
		});

		this.validate();
	}

	public setValidationResults(validationResults: ValidationResult[]): ValidationResultList {
		if (!isEmpty(validationResults)) {
			let results = new ValidationResultList(validationResults, this.name, this.data);
			this._mergeValidationResults(results);
		}

		return this.validationResults;
	}

	public validate() {
		const results = this.validator.validate(this.data, this.customValidationOptions);
		this._mergeValidationResults(results);

		Object.keys(this._forms).forEach(formName => {
			this._forms[formName].validate();
		});

		return this.validationResults;
	}

	private _mergeValidationResults(validationResults: ValidationResultList) {
		validationResults.forEach(result => {
			this.validationResults.remove(result.propertyName);
			this.validationResults.push(result);
		});

		this.validationResults.value = this.data;
		this._emitter.emit('validated', this.validationResults);
	}
}