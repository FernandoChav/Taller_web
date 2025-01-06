import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EntityGroup } from '../../../entities/entity.group';
import { Product } from '../../interface/product';
import { NgFor } from '@angular/common';
import { ProductViewComponent } from '../product-view/product-view.component';
import { ProductController } from '../../controller/product.controller';
import { ShoppingCartService } from '../../../shopping-cart/service/shopping.cart.service';
import { HttpShoppingCartService } from '../../../shopping-cart/service/http.shopping.cart.service';
import { CartItem } from '../../../shopping-cart/interface/shopping.cart';


/**
 * This componet represent the table for show the product for buy
 */

@Component({
  selector: 'app-product-view-table',
  imports: [NgFor],
  templateUrl: './product-view-table.component.html',
  styleUrl: './product-view-table.component.css',
  standalone: true
})
export class ProductViewTableComponent {

  /**
   * This is dictionary for represent a number with a type product 
   */

  private productNumberToString : Map<number, string> = new Map<number, string>()
  .set(0, "Polera")
  .set(1, "Gorro")
  .set(2, "Juguetería")
  .set(3, "Alimentación")
  .set(4, "Libro");


  /**
   * This is a controller-service for access the information shared between components
   */
  readonly controller : ProductController;
  
  /**
   * This is the main constructor
   * @param controller the controller-service
   * @param shoppingCartService the shopping cart service
   */

  constructor(controller : ProductController,
    private shoppingCartService : HttpShoppingCartService
  ) {
    this.controller = controller;
  }

  /**
   * Add a new product to shopping cart
   * @param product the product for add
   */

  addProduct(product : Product) {

      var cartItem : CartItem = {
          productId : product.id,
          productName : product.name,
          quantity : 1,
          price : product.price
      };

      console.log("AÑADIENDO : " + cartItem);

      this.shoppingCartService.addToCart(cartItem)
      .forEach(next => {
        console.log("SAVING COOKIE");
        
        document.cookie = `ShoppingCart=${next}`;
      });
  }

  /**
   * Convert a number product type to string product type
   * @param value the number product type 
   * @returns the string product type
   */

  public translateProductType(value : number) {
    return this.productNumberToString.get(value);
  }

}
