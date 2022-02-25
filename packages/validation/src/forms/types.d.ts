import Form from './Form'

export type Proxify<T> = {
	[P in keyof T]: T[P];
}

export type InitialFormData<T> = { [P in keyof T]: T[P] | null | Form<T[P]> }

export type FormOptions = {
	name?: string;
	debounce?: number;
}