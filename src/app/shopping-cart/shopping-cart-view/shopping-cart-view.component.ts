import { Component, OnInit } from '@angular/core';
import { CartItem } from '../interface/shopping.cart';
import { ShoppingCartService } from '../service/shopping.cart.service';
import { HttpShoppingCartService } from '../service/http.shopping.cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-shopping-cart-view',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './shopping-cart-view.component.html',
  styleUrl: './shopping-cart-view.component.css'
})
export class ShoppingCartViewComponent implements OnInit {

  private items : CartItem[] = [];
  private finalPrice : number = 0;

  constructor(private shoppingCartService : HttpShoppingCartService) {}

  resetFinalPrice() {
    this.finalPrice = 0;
  }

  calculateFinalPrice() {
    this.resetFinalPrice();
    for(let item of this.items) {
        this.finalPrice += item.price * item.quantity;
    }
  }

  ngOnInit(): void {
      this.shoppingCartService.get()
      .forEach(next => {
          this.items = next;
      });
  }

  public getItems() : CartItem[] {
    return this.items;
  }

  public getFinalPrice() : number {
    return this.finalPrice;
  }

}
