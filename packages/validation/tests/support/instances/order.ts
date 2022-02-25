import Order from '../model/Order';
import { validAddress } from './address';
import { validProduct1, validProduct2, validProduct3, validProduct4, validProduct5 } from './product';

function sum(...args: number[]) {
	return args.reduce((c,p) => c + p, 0);
}

const validOrder1Freight = 11.61;

export const validOrder1: Order = {
	orderDate: '2014-07-05T00:00:00.000Z',
	requiredDate: '2014-08-16T00:00:00.000Z',
	shippedDate: '2014-07-10T00:00:00.000Z',
	freight: validOrder1Freight,
	totalPrice: sum(
		validProduct1.unitPrice * validProduct1.quantity,
		validProduct2.unitPrice * validProduct2.quantity,
		validOrder1Freight
	),
	shipAddress: validAddress,
	products: [
		validProduct1,
		validProduct2,
	]
}

const validOrder2Freight = 29.46;

export const validOrder2: Order = {
	orderDate: '2015-08-25T00:00:00.000Z',
	requiredDate: '2015-09-22T00:00:00.000Z',
	shippedDate: '2015-09-02T00:00:00.000Z',
	freight: validOrder2Freight,
	totalPrice: sum(
		validProduct3.unitPrice * validProduct3.quantity,
		validProduct4.unitPrice * validProduct4.quantity,
		validProduct5.unitPrice * validProduct5.quantity,
		validOrder2Freight
	),
	shipAddress: validAddress,
	products: [
		validProduct3,
		validProduct4,
		validProduct5
	]
};