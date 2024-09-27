import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';

import { AuthData } from "../../models/auth-data.model";
import { LoginData } from "../../models/login-data.model";
import { Product } from "src/app/models/product";
import { VendorData } from "src/app/models/vendor-data.model";
@Injectable({ providedIn: 'root' })
export class AuthService{
  userId: string = '';
  role: string = '';
  isAuthenticated = false;
  private tokenTimer: any;
  private tokenData: string = '';
  private authStatusListner = new Subject<boolean>();
  private _registerURL2 = 'http://localhost:8083/customers';
  private _registerURL = 'http://localhost:8082/vendors';
  private _loginURL = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar){
  }

  getAuthStatusListner(){
    return this.authStatusListner.asObservable();
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getAuth(){
    return this.isAuthenticated;
  }

  createUser(firstName:string, lastName:string, phoneNumber: string,email: string, username: string,password: string, address: string, role: string){
    const authData: AuthData = {
      customerFirstName: firstName,
      customerLastName: lastName,
      customerPhoneNumber: phoneNumber,
      customerEmail: email,
      customerUsername:username,
      customerPassword: password, 
      customerAddress: address,
      role: role,
      
    };
       return this.http.post<any>(this._registerURL2, authData)    
  }

  createVendor(firstName:string, lastName:string, phoneNumber: string,email: string, userName: string,password: string, address: string, role: string){
    const vendorData: VendorData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      userName:userName,
      password: password, 
      vendorAddress: address,
      role: role
      
    };
       return this.http.post<any>(this._registerURL, vendorData)
    
  }

  login(email: string, password: string){
    const loginData: LoginData = {email: email, password: password }
    this.http.post<{
      token: string,
      role: string
    }>(this._loginURL, loginData).subscribe((res) => {
      const token = res.token;
      if(token){
        console.log(res)
        this.role = res.role;

        this.saveAuthData(token, this.role);
        if(res.role == "CUSTOMER"){
          this.router.navigate(['/special'])
         }
          if(res.role == "VENDOR"){
            this.router.navigate(['/product'])
          }
          if(res.role == "ADMIN"){
            this.router.navigate(['/admin'])
          }

      }
    })
  }

  private saveAuthData(token: string, role: string){
    localStorage.setItem('token', token);
    localStorage.setItem('role', role)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/product'])
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000)
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(!authInfo){
      return;
    }
    const now = new Date();
    if(authInfo != undefined){
      const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
      if(expiresIn > 0){
        this.tokenData = authInfo.token;
        this.isAuthenticated = true;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListner.next(true);
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  logout(){
    this.tokenData = '';
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
    this.clearAuthData();
    this.openSnackBar('Logged out', 'Dismiss')
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userType: userType
    }
  }

  getUserId(){
    return localStorage.getItem("userId");
  }

  getUserType(){
    return localStorage.getItem("userType");
  }
}
