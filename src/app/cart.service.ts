import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: IProduct[] = [];
  constructor() { }

  add(product: IProduct){
    console.log(`product ${product.name} added to cart`)
    this.cart.push(product)
  }
}
