import {CartItem} from './../../models/cart-items';
import {CartService} from './../../services/cart.service';
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Product} from "src/app/models/product";
import {ProductmService} from "src/app/services/productm.service";
import {CartService2} from 'src/app/services/cart.service2';

@Component({
  selector: "app-product-list",
  // templateUrl: './product-list.component.html',
  //templateUrl: "./product-list-table.component.html",
  templateUrl: "./product-list-grid.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products!: Product[];


  currentCategoryId!: string;
  searchKey: string = "";

  constructor(private productService: ProductmService, private cartService: CartService, private route: ActivatedRoute, private cartService2: CartService2) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })

  }

  addToCart(pro: Product) {
    console.log(`adding to the cart:${pro.productName},${pro.unitPrice}`)
    const item = new CartItem(pro);
    this.cartService.addToCart(item);

  }

  addtocart(item: any) {
    this.cartService2.addtoCart(item);

  }

  listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('name');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      //this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      this.currentCategoryId = this.route.snapshot.params['name'];
    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = "fruit";
    }
    this.productService.getProductList(this.currentCategoryId).subscribe((data) => {
      this.products = data;
    });
    this.cartService2.search.subscribe(
      (val: any) => {
        this.searchKey = val
      });
  }


}
