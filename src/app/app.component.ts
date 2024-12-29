import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ProductViewComponent } from './product/view/product-view/product-view.component';
import { ShoppingCartViewComponent } from './shopping-cart/shopping-cart-view/shopping-cart-view.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    ProductViewComponent,
    ShoppingCartViewComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'Taller_web';

  ngOnInit(): void {
    initFlowbite();
  }
}
