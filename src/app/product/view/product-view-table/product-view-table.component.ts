import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EntityGroup } from '../../../entities/entity.group';
import { Product } from '../../interface/product';
import { NgFor } from '@angular/common';
import { ProductViewComponent } from '../product-view/product-view.component';
import { ProductController } from '../../controller/product.controller';
import { ShoppingCartService } from '../../../shopping-cart/service/shopping.cart.service';
import { HttpShoppingCartService } from '../../../shopping-cart/service/http.shopping.cart.service';
import { CartItem } from '../../../shopping-cart/interface/shopping.cart';

@Component({
  selector: 'app-product-view-table',
  imports: [NgFor],
  templateUrl: './product-view-table.component.html',
  styleUrl: './product-view-table.component.css',
  standalone: true
})
export class ProductViewTableComponent {

  private productNumberToString : Map<number, string> = new Map<number, string>()
  .set(0, "Polera")
  .set(1, "Gorro")
  .set(2, "Juguetería")
  .set(3, "Alimentación")
  .set(4, "Libro");

  readonly controller : ProductController;
  
  constructor(controller : ProductController,
    private shoppingCartService : HttpShoppingCartService
  ) {
    this.controller = controller;
  }

  addProduct(product : Product) {

      var cartItem : CartItem = {
          productId : product.id,
          productName : product.name,
          quantity : 1,
          price : product.price
      };

      console.log("AÑADIENDO : " + cartItem);

      document.cookie = "hola=1";

      this.shoppingCartService.addToCart(cartItem)
      .forEach(next => {
        console.log("SAVING COOKIE");
        document.cookie = `ShoppingCart=${next}`;
      });
  }

  public translateProductType(value : number) {
    return this.productNumberToString.get(value);
  }

}
