import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Apilinks } from '../aplinks';
import { CartState } from '../cart-state';
import { CartProduct } from '../food-info';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  constructor(private service: Apilinks, private cart: CartState) {
    this.loadCart();
  }

  public cartItems = signal<CartProduct[]>([]);

  loadCart() {
    this.service.cartProducts().subscribe({
      next: (data: CartProduct[]) => {
        this.cartItems.set(data);
        this.cart.count.set(data.reduce((sum, item) => sum + item.quantity, 0));
      },
      error: (err) => {},
    });
  }

  totalPrice(): number {
    return this.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  changeQuantity(item: CartProduct, change: number) {
    const newQuantity = item.quantity + change;

    if (newQuantity > 0) {
      const info = {
        quantity: newQuantity,
        price: item.product.price,
        productId: item.product.id,
      };
      this.service.update(info).subscribe({
        next: () => this.loadCart(),
        error: (err) => {},
      });
    } else {
      this.removeItem(item.product.id);
    }
  }

  increase(item: CartProduct) {
    this.changeQuantity(item, 1);
  }

  decrease(item: CartProduct) {
    this.changeQuantity(item, -1);
  }

  removeItem(id: number) {
    this.service.deleteCartItem(id).subscribe({
      next: () => this.loadCart(),
      error: (err) => {},
    });
  }
}