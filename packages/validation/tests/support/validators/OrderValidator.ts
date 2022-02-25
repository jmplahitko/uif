import { Validator, rx } from '../../../src';
import Order from '../model/Order';
import DateRule from './rules/DateRule';
import PositiveNumberRule from './rules/PositiveNumberRule';
import AddressValidator from './AddressValidator';
import OrderProductValidator from './OrderProductValidator';

function beSumOfAllProductPricesPlusFreight(value: any, order: Order) {
	const totalProductPrice = order.products.map(x => x.unitPrice * x.quantity).reduce((p, c) => p + c, 0);
	return value === (totalProductPrice) + order.freight;
}

export default class OrderValidator extends Validator<Order> {
	constructor() {
		super();

		this.ruleFor(x => x.orderDate)
			.notEmpty()
			.withMessage(() => 'Order date is required.')
			.using(new DateRule());

			this.ruleFor(x => x.requiredDate)
				.notEmpty()
				.withMessage(() => 'Required date is required.')
				.using(new DateRule());

			this.ruleFor(x => x.shippedDate)
				.notEmpty()
				.withMessage(() => 'Shipped date is required.')
				.using(new DateRule());

			this.ruleFor(x => x.freight)
				.notEmpty()
				.withMessage(() => 'Freight is required.')
				.using(new PositiveNumberRule('freight', 'Freight'));

			this.ruleFor(x => x.shipAddress)
				.using(new AddressValidator());

			this.ruleFor(x => x.products)
				.notEmpty()
				.withMessage(() => 'Orders must have at least one product.');

			this.ruleForEach(x => x.products)
				.using(new OrderProductValidator());

			this.ruleFor(x => x.totalPrice)
				.must(beSumOfAllProductPricesPlusFreight)
				.withMessage(() => 'Total price must equal all product prices times quantities');
	}
}