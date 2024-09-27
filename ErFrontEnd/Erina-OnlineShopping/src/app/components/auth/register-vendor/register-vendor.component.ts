import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.css']
})
export class RegisterVendorComponent implements OnInit {

  userType: string = "";
  userTypes: string[] = ['vendor', 'customer'];
  isLoading: boolean = false;

  registerUserData :any= {}
  constructor(public authService: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createVendor(

      // firstName: string;
      // lastName: string;
      // phoneNumber: string;
      // email: string;
      // username: string;
      // password: string;
      // address: string;
      // role: string;

      form.value.firstName,
      form.value.lastName,
      form.value.phoneNumber,
      form.value.email,
      form.value.userName,
      form.value.password,
      form.value.vendorAddress,
      form.value.role
    ).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/products'])
      },
      err => console.log(err)
    )
    
  }
  

}
function token(arg0: string, token: any) {
  throw new Error('Function not implemented.');

}
