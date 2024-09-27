/*The following code done by Aboneh and Mitiku*/

import { Component, OnInit } from '@angular/core';
import { CartService2 } from '../../services/cart.service2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  cartItems: any[] = []
  constructor(private cartService : CartService2) { }


  //  we have now to add the strip checkout logic here in this place
  //we have to create the logic for the checkout button.
  //we have to call the cart-service and the cart service will ping the backend endpoint that fulfills the specified task
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();   //need to be changed with purpose stripe checkout above.
    })
   this.cartItems = this.cartService.getCartItemList();
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

}
