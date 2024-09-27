import { Product } from "./product";
export class CartItem {
    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number;

    constructor(product: Product){
        this.id = product.productId;
        this.name = product.productName;
        this.imageUrl = product.pictureUrl;
        this.unitPrice = product.unitPrice;
        this.quantity = 1;
    }
}