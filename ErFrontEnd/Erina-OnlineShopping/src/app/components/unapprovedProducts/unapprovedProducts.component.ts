import {CartService} from 'src/app/services/cart.service';
import {CartItem} from './../../models/cart-items';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from 'src/app/models/product';
import {CartService2} from "src/app/services/cart.service2";
import {ProductmService} from 'src/app/services/productm.service';

@Component({
  selector: 'app-unapprovedProduct',
  templateUrl: './unapprovedProducts.component.html',
  styleUrls: ['./unapprovedProducts.component.css']
})
export class UnapprovedProductsComponent implements OnInit {

  unapprovedProducts!: Product[];


  constructor(private productService: ProductmService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listAllProducts();
    })
  }

  listAllProducts() {
    this.productService.getAllUnapprovedProducts().subscribe(
      data => this.unapprovedProducts = data
    );
  }

  approveProduct(product: Product) {
    console.log("unapprovedProduct", product)
    // const isApproved = {isApproved: true};
    this.productService.approveProduct(product.productId).subscribe(res => {
      console.log("response", res)
    });
  }
}
