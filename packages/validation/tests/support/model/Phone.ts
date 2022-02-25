import PhoneType from './PhoneType';

export default class Phone {
	public type!: PhoneType;
	public value!: string;
	public display!: string;
	public isInternational!: boolean;
}