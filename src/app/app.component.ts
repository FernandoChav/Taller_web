import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

import { ShoppingCartViewComponent } from './shopping-cart/shopping-cart-view/shopping-cart-view.component';
import { UserViewComponent } from './user/view/user-view/user-view.component';
import { UserPanelViewComponent } from './user-panel/user-panel-view/user-panel-view.component';
import { CommonModule } from '@angular/common';
import { NotFoundViewComponent } from './not-found/view/not-found-view/not-found-view.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet
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
