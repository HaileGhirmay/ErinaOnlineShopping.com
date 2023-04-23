import { CartItem } from './../../models/cart-items';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductmService } from 'src/app/services/productm.service';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {


  product: Product = new Product();

  constructor(private productService: ProductmService,
    private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: string = this.route.snapshot.params['name'];

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart() {
    console.log(`Adding to cart:${this.product.productName}, ${this.product.unitPrice}`)
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
