import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { AdminProductServiceShared } from '../../service/admin.product.service.shared';
import { Router } from '@angular/router';

/**
 * This componet perms handler interactions for products
 * As search or go the next and previous
 */

@Component({
  selector: 'app-product-admin-view-interactions',
  standalone: true,
  imports: [],
  templateUrl: './product-admin-view-interactions.component.html',
  styleUrl: './product-admin-view-interactions.component.css'
})
export class ProductAdminViewInteractionsComponent {

  constructor(public serviceShared : AdminProductServiceShared,
      public productService : ProductService,
      private router: Router) {}
  
  /**
   * Search product by name
   * @param event the event
   */

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

  /**
   * Reset the page to page 1
   */

  reset(): void {
    this.serviceShared.resetPage(); 
}

  /**
   * Update all products 
   */

  private update() {
    this.productService.query(
        this.serviceShared.parameters()
    ).forEach(promise => {
      this.serviceShared.group = promise;
    });
  }

  /**
   * Go to the next page
   */

  nextPage(): void {
    this.serviceShared.page++;
    this.update();
  }

  /**
   * Go the previous page
   */

  previousPage(): void {
    this.serviceShared.page--;
    this.update();
  }

  /**
   * This method send the create product page
   */

  redirectCreateUser() {
    this.router.navigate(['/create-product']);
  }

}
