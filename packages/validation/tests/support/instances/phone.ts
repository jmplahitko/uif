import Phone from '../model/Phone';
import PhoneType from '../model/PhoneType';

export const validWorkPhone: Phone = {
	type: PhoneType.work,
	value: '3175555555',
	display: 'Work',
	isInternational: false
};

export const validMobilePhone: Phone = {
	type: PhoneType.mobile,
	value: '3175656666',
	display: 'Cell',
	isInternational: false
};

export const invalidTypePhone: Phone = {
	// @ts-ignore - we are intentionally setting a bad enum here
	type: 'badType',
	value: '3175555555',
	display: 'Work',
	isInternational: false
};