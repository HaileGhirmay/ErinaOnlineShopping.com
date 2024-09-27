import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:8081/products';
  //private baseUrl = 'http://localhost:8080/api/products';
   //private baseUrl = 'http://localhost:8080/api/products';
  private _specialUrl = "http://localhost:3000/api/special";


  constructor(private http: HttpClient) {

  }

  getAllProductList(): Observable<Product[]> {
    console.log("products");
    return this.http
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }
  getSpecial() {
    return this.http.get<any>(this._specialUrl)
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
