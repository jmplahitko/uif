import Address from '../model/Address';

export const validAddress: Address = {
	line1: '7890 Hanover Sq',
	line2: 'Ste 123',
	city: 'Indianapolis',
	region: 'IN',
	postalCode: '46201',
	country: 'USA'
};

// @ts-ignore - intentionally missing line1
export const invalidLine1Address: Address = {
	line2: 'Ste 123',
	city: 'Indianapolis',
	region: 'IN',
	postalCode: '46201',
	country: 'USA'
}