import Address from './Address';
import OrderProduct from './OrderProduct';

export default class Order {
	public orderDate!: string;
	public requiredDate!: string;
	public shippedDate!: string;
	public freight!: number;
	public shipAddress!: Address;
	public products!: OrderProduct[];
	public totalPrice!: number;
}