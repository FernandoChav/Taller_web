import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ProductViewComponent } from './product/view/product-view/product-view.component';
import { ShoppingCartViewComponent } from './shopping-cart/shopping-cart-view/shopping-cart-view.component';
import { UserViewComponent } from './user/view/user-view/user-view.component';
import { UserPanelViewComponent } from './user-panel/user-panel-view/user-panel-view.component';
import { CommonModule } from '@angular/common';
import { NotFoundViewComponent } from './not-found/view/not-found-view/not-found-view.component';
import { ProductAdminViewComponent } from './product/admin/view/product-admin-view/product-admin-view.component';
import { ProductAdminViewEditComponent } from './product/admin/view/product-admin-view-edit/product-admin-view-edit.component';
import { ProductAdminViewCreateComponent } from './product/admin/view/product-admin-view-create/product-admin-view-create.component';
import { PurchasingProcessViewComponent } from './purchasing-process/view/purchasing-process-view/purchasing-process-view.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    ProductViewComponent,
    ShoppingCartViewComponent,
    UserViewComponent, 
    UserPanelViewComponent,
    CommonModule,
    NotFoundViewComponent,
    ProductAdminViewComponent,
    ProductAdminViewEditComponent,
    ProductAdminViewCreateComponent,
    PurchasingProcessViewComponent
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
