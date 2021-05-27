import { Injectable } from '@angular/core';
import { Cart } from '../models/cart-modele';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carts: Cart[];
  cart: Cart;

  constructor() {
    this.initCarts();
  }

  initCarts(): void {

  }
}

