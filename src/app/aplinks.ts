import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddCartObj, CartProduct, Categories, FilteredFood, FoodInfo } from './food-info';

@Injectable({
  providedIn: 'root'
})
export class Apilinks {
  private http = inject(HttpClient);

  getAllFoods() {
    return this.http.get<FoodInfo[]>('https://restaurant.stepprojects.ge/api/Products/GetAll');
  }
  
  changeCategory(id: number) {
    return this.http.get<FilteredFood>(
      `https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`,
    );
  }

  getALLCategories() {
    return this.http.get<Categories[]>('https://restaurant.stepprojects.ge/api/Categories/GetAll');
  }

  addToCart(info: AddCartObj) {
    return this.http.post('https://restaurant.stepprojects.ge/api/Baskets/AddToBasket', info);
  }
  
  update(info: AddCartObj) {
    return this.http.put('https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket', info);
  }

  cartProducts() {
    return this.http.get<CartProduct[]>('https://restaurant.stepprojects.ge/api/Baskets/GetAll');
  }
  
  deleteCartItem(id: number) {
    return this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`);
  }

 getFiltered(vegeterian: boolean, nuts: boolean, spiciness: number) {
    return this.http.get<FoodInfo[]>(
      `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian}&nuts=${nuts}&spiciness=${spiciness}`
    );
}
}