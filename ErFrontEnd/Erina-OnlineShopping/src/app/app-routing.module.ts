import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterVendorComponent } from './components/auth/register-vendor/register-vendor.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { SpecialProductComponent } from './components/special-product/special-product.component';
import { UserAuthGuard } from './guards/user-auth.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import {UnapprovedProductsComponent} from "./components/unapprovedProducts/unapprovedProducts.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },{
   path: 'unapprovedProducts',
    component: UnapprovedProductsComponent
  },
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'category/:name',
    component: ProductListComponent
  },
  {
    path: 'category',
    component: ProductListComponent
  },

  {
    path: 'special',
    component: SpecialProductComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'admin',
    component: DashboardComponent
  },
  {
    path: 'shoppingCart',
    component: ProductDetailComponent
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'registerVendor',
        component: RegisterVendorComponent
      },
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
