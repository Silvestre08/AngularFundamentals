import { Component, Input } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
@Input() product! : IProduct;
constructor() {
 }

 getImageUrl(product: IProduct){
  return '/assets/images/robot-parts/' + product.imageName;
 }
 addToCart(product: IProduct){
  console.log(`product ${product.name} added to cart`)
}
getDiscountedClasses(product: IProduct){
  return  {strikeThrough: product.discount >0}
}
}
