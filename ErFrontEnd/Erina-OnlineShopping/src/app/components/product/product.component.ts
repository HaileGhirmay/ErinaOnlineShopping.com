import { CartService } from 'src/app/services/cart.service';
import { CartItem } from './../../models/cart-items';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService2 } from "src/app/services/cart.service2";
import { ProductmService } from 'src/app/services/productm.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products!: Product[];
  searchKey!: string;
  showAddToCartButton = false;
  quantities = [1,2,3,4,5];
  selectedQuantity: number= 1;

  product: Product = {} as Product;
  addNewProduct = true;
  isVendor = true;


  constructor(private productService: ProductmService, private cartService2: CartService2, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listAllProducts();
    })

  }
  addToCart(pro: Product) {
    console.log(`adding to the cart:${pro.productName},${pro.unitPrice}`)
    const item = new CartItem(pro);
    this.cartService.addToCart(item);

  }

  listAllProducts() {
    this.productService.getAllProducts().subscribe(
      data => this.products = data
    );
    this.cartService2.search.subscribe(
    ( val:any)=>{this.searchKey=val});
  }

addtocart(item: any){
    item.quantity = this.selectedQuantity;
  this.cartService2.addtoCart(item);
  const cartItemLength  = this.cartService2.getCartItemList().length;
  if(cartItemLength>0){
    this.showAddToCartButton = true;
  }else{
    this.showAddToCartButton = false;
  }
 }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe();
  }

  toggleAddNewProduct() {
    this.addNewProduct = !this.addNewProduct;
  }
}

