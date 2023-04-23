import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { CartService2 } from './services/cart.service2';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdmin = true;
  title = 'e-commerce';

  constructor(public _authService: AuthService,
              public search: SearchService,
              public cartService:CartService2){

  }
}
