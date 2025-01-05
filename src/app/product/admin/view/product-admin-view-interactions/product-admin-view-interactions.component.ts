import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { AdminProductServiceShared } from '../../service/admin.product.service.shared';

@Component({
  selector: 'app-product-admin-view-interactions',
  standalone: true,
  imports: [],
  templateUrl: './product-admin-view-interactions.component.html',
  styleUrl: './product-admin-view-interactions.component.css'
})
export class ProductAdminViewInteractionsComponent {

  constructor(public serviceShared : AdminProductServiceShared,
      public productService : ProductService) {}
  
  onSearch(event : Event) {
    this.serviceShared.resetPage();

    const input = event.target as HTMLInputElement; 
    this.serviceShared.searchedProduct = input.value;

    this.productService.query(
      this.serviceShared.parameters()
    ).forEach(next => {
      this.serviceShared.group = next;
    });
  }

  reset(): void {
    this.serviceShared.resetPage(); 
}

  private update() {
    this.productService.query(
        this.serviceShared.parameters()
    ).forEach(promise => {
      this.serviceShared.group = promise;
    });
  }

  nextPage(): void {
    this.serviceShared.page++;
    this.update();
  }

  previousPage(): void {
    this.serviceShared.page--;
    this.update();
  }

  redirectCreateUser() {
    
  }

}
