import { Component, OnInit } from '@angular/core';
import { CartItem } from '../interface/shopping.cart';
import { ShoppingCartService } from '../service/shopping.cart.service';
import { HttpShoppingCartService } from '../service/http.shopping.cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../../Authentication/Components/navbar/navbar.component";

/**
 * This component show the shopping cart 
 */

@Component({
  selector: 'app-shopping-cart-view',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, NavbarComponent],
  templateUrl: './shopping-cart-view.component.html',
  styleUrl: './shopping-cart-view.component.css'
})
export class ShoppingCartViewComponent implements OnInit {

  /**
   * A set items that contains the shopping cart
   */

  private items : CartItem[] = [];

  /**
   * The final price for pay
   */

  private finalPrice : number = 0;

  constructor(private shoppingCartService : HttpShoppingCartService) {}

  /**
   * This method assign the final price in zero
   */

  resetFinalPrice() {
    this.finalPrice = 0;
  }

  /**
   * This method calculate the final price, sum all prices of products
   */

  calculateFinalPrice() {
    this.resetFinalPrice();
    for(let item of this.items) {
        this.finalPrice += item.price * item.quantity;
    }
  }

  /**
   * The start method load all cart item 
   */

  ngOnInit(): void {
      this.shoppingCartService.get()
      .forEach(next => {
          this.items = next;
      });
  }

  /**
   * Return the items
   * @returns the items
   */

  public getItems() : CartItem[] {
    return this.items;
  }

  /**
   * Return the final price
   * @returns the final price
   */

  public getFinalPrice() : number {
    return this.finalPrice;
  }

}
