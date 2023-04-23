import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product"
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ProductCategory} from "../models/product-category";

@Injectable({
  providedIn: "root",
})

export class ProductmService {

  private productBaseUrl = 'http://localhost:8080/api/products';
  private baseUrl = 'http://localhost:8081/products/Available';
  private unapprovedProductsUrl = 'http://localhost:8081/products/upApproved';
  // private categoryUrl = 'http://localhost:8080/api/product-category';
  private categoryUrl = 'http://localhost:8081/products/Available/category';
  private adminBaseUrl = 'http://localhost:8087/admins';

  constructor(private httpClient: HttpClient) {
  }

  getProductList(theCategoryId: string): Observable<Product[]> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/category/${theCategoryId}`;

    return this.httpClient.get<Product[]>(`${searchUrl}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}`);
  }

  getAllUnapprovedProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.unapprovedProductsUrl}`);
  }

  approveProduct(productId: number): Observable<Product> {
    let approved = true;
    const body = {approved};
    return this.httpClient.post<Product>(`${this.adminBaseUrl}/approveProduct/${productId}`, body);
  }

  getProduct(theProductId: string): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }


  getProductCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.categoryUrl}`);
  }

  addProduct(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(this.productBaseUrl, product);
  }
}
