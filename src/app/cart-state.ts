import { inject, Injectable, signal } from '@angular/core';
import { Apilinks } from './aplinks';

@Injectable({ providedIn: 'root' })
export class CartState {
  private service = inject(Apilinks);

  public count = signal<number>(0);

  refresh() {
    this.service.cartProducts().subscribe({
      next: (items) => {
        this.count.set(items.reduce((sum, item) => sum + item.quantity, 0));
      },
      error: () => {},
    });
  }
}