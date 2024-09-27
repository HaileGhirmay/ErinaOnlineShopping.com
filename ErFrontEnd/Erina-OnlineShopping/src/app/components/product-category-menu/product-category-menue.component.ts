
import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductmService } from 'src/app/services/productm.service';


@Component({
  selector: 'app-product-category-menue',
  templateUrl: './product-category-menue.component.html',
  styleUrls: ['./product-category-menue.component.css']
})
export class ProductCategoryMenueComponent implements OnInit {
  productCategories!: string[];

  constructor(private productmService: ProductmService) { }

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {

    this.productmService.getProductCategories().subscribe(
      data => {

        console.log('Product Categories=' + JSON.stringify(data));  //

        this.productCategories = data;
      }
    );
  }

}