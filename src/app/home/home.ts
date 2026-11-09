import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Apilinks } from '../aplinks';
import { CartState } from '../cart-state';
import { AddCartObj, CartProduct, Categories, FilteredFood, FoodInfo } from '../food-info';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  constructor(private service: Apilinks, public cart: CartState) {
    this.showFoods();
    this.showCategories();
    this.cart.refresh();
  }

  public foodData = signal<FoodInfo[]>([]);
  public allFoods: FoodInfo[] = [];
  public categories = signal<Categories[]>([]);
  public activeCategory = signal<number>(0);

  public spiciness = signal<number>(0);
  public noNuts = signal<boolean>(false);
  public vegetarian = signal<boolean>(false);

  showFoods() {
    this.activeCategory.set(0);
    this.service.getAllFoods().subscribe({
      next: (data: FoodInfo[]) => {
        this.allFoods = data;
        this.foodData.set(data);
      },
      error: (err) => {},
    });
  }

  applyFilter() {
    let filtered = this.allFoods;

    if (this.spiciness() > 0) {
      filtered = filtered.filter((item) => item.spiciness === this.spiciness());
    }

    if (this.noNuts()) {
      filtered = filtered.filter((item) => item.nuts === false);
    }

    if (this.vegetarian()) {
      filtered = filtered.filter((item) => item.vegeterian === true);
    }

    this.foodData.set(filtered);
  }

  resetFilter() {
    this.spiciness.set(0);
    this.noNuts.set(false);
    this.vegetarian.set(false);
    this.foodData.set(this.allFoods);
  }

  damateba(item: FoodInfo) {
    let info: AddCartObj = {
      quantity: 1,
      price: item.price,
      productId: item.id,
    };

    this.service.cartProducts().subscribe((data: CartProduct[]) => {
      let naponvi = data.find((cartItem: CartProduct) => item.id == cartItem.product.id);
      if (naponvi) {
        info.quantity = naponvi.quantity + 1;
        this.service.update(info).subscribe(() => this.cart.refresh());
      } else {
        this.service.addToCart(info).subscribe(() => this.cart.refresh());
      }
    });
  }

  showCategories() {
    this.service.getALLCategories().subscribe((data: Categories[]) => this.categories.set(data));
  }

  changeCat(id: number) {
    this.service.changeCategory(id).subscribe({
      next: (data: FilteredFood) => {
        this.activeCategory.set(id);

        this.spiciness.set(0);
        this.noNuts.set(false);
        this.vegetarian.set(false);

        this.allFoods = data.products;
        this.foodData.set(data.products);
      },
      error: (err) => {},
    });
  }
}