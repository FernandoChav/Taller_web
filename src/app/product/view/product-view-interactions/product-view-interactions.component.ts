import { Component, Input, ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ObjectParameters } from '../../../entities/object.parameters';
import { ProductController } from '../../controller/product.controller';

@Component({
  selector: 'app-product-view-interactions',
  standalone: true,
  imports: [],
  templateUrl: './product-view-interactions.component.html',
  styleUrl: './product-view-interactions.component.css'
})
export class ProductViewInteractionsComponent {

  private readonly productService : ProductService;
  readonly controller : ProductController;

  constructor(productService : ProductService, 
    controller : ProductController
  ) {
    this.productService = productService;
    this.controller = controller;
  }

   reset(): void {
      this.controller.page = 0;
  }
  
    private update() {
      this.productService.query(
          this.controller.parameters()
      ).forEach(promise => {
        this.controller.group = promise;
      });
    }

    nextPage(): void {
      this.controller.page++;
      this.update();
    }
  
    previousPage(): void {
      this.controller.page--;
      this.update();
    }

    order(asceding : boolean) {
      this.controller.isOrderingByPrice = true;
      this.controller.isAscending = asceding;
      this.update();
    }

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
