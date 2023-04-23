import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
    this.authService.createUser(
      form.value.customerFirstName,
      form.value.customerLastName,
      form.value.customerPhoneNumber,
      form.value.customerEmail,
      form.value.customerUsername,
      form.value.customerPassword,
      form.value.customerAddress,
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

