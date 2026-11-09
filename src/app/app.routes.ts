import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cart } from './cart/cart'; 

export const routes: Routes = [
  { path: '', component: Home },          
  { path: 'cart', component: Cart }       
];