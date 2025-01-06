import { Component, Input, ViewChild } from '@angular/core';
import { ObjectParameters } from '../../../entities/object.parameters';
import { ProductController } from '../../controller/product.controller';
import {ProductService} from '../../service/product.service';

/**
 * This is a component that contains interactions for handle the products
 * With this interactions is possible:
 * * Search Products
 * * Go next and previous page
 * * Order
 */

@Component({
  selector: 'app-product-view-interactions',
  standalone: true,
  imports: [],
  templateUrl: './product-view-interactions.component.html',
  styleUrl: './product-view-interactions.component.css'
})
export class ProductViewInteractionsComponent {

  /**
   * The product sarvice for handle the products
   */

  private readonly productService : ProductService;

  /**
   * A controller-service for uses properties between components
   */

  readonly controller : ProductController;

  constructor(productService : ProductService,
    controller : ProductController
  ) {
    this.productService = productService;
    this.controller = controller;
  }

  /**
   * Reset the page and assign as 1
   */

   reset(): void {
      this.controller.page = 1;
  }

  /**
   * Update all products, making a new query from parameters
   */

    private update() {
      this.productService.query(
          this.controller.parameters()
      ).forEach(promise => {
        this.controller.group = promise;
      });
    }

    /**
     * Go the next page and update
     */

    nextPage(): void {
      this.controller.page++;
      this.update();
    }

    /**
     * Go the preivous page and update
     */

    previousPage(): void {
      this.controller.page--;
      this.update();
    }

    /**
     * Order the elements based a criteria
     * @param asceding define is the criteria is ascending 
     */

    order(asceding : boolean) {
      this.controller.isOrderingByPrice = true;
      this.controller.isAscending = asceding;
      this.update();
    }

    /**
     * Search elements from a set characters
     * @param event the event 
     */

    onSearch(event : Event) {
        this.controller.resetPage();

        const input = event.target as HTMLInputElement;
        this.controller.searchedProduct = input.value;

        this.productService.query(
          this.controller.parameters()
        ).forEach(next => {
          this.controller.group = next;
        });
    }

}
