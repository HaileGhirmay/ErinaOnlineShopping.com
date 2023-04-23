import { Product } from './product';
export class CartItem {
	productId!: number;
	productName!: string;
	imageUrl!: string;
	unitPrice!: number;
	quantity!: number;
	constructor(pro: Product) {
		this.productId = pro.productId;
		this.productName = pro.productName;
		this.imageUrl = pro.pictureUrl;
		this.unitPrice = this.unitPrice;
		this.quantity = 1;
	}

}
