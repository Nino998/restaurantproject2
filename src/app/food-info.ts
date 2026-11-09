export interface FoodInfo {
  id: number;
  name: string;
  price: number;
  nuts: boolean;
  image: string;
  vegeterian: boolean;
  spiciness: number;
  categoryId: number;
}

export interface Categories {
  id: number;
  name: string;
}

export interface FilteredFood {
  id: number;
  name: string;
  products: FoodInfo[];
}

export interface AddCartObj {
  quantity: number;
  price: number;
  productId: number;
}

export interface CartProduct {
  quantity: number;
  price: number;
  product: FoodInfo 
}
