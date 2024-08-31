import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
products: any ; // needs to be public to be accessed from the template.
filter: string= '';
//  private carSvc: CartService = inject(CartService);
 constructor(private cartService : CartService, private productService: ProductService) {
 }

 ngOnInit(){
this.productService.getProducts().subscribe(products =>
  {
    this.products = products;
  });
 }

 getFilteredProducts(){
  return this.filter === '' 
  ? this.products 
  : this.products.filter((product: { category: string; })=> product.category === this.filter)
 }
 getDiscountedClasses(product: IProduct){
  return  {strikeThrough: product.discount >0}
}
addToCart(product: IProduct){
  this.cartService.add(product);
}
}
