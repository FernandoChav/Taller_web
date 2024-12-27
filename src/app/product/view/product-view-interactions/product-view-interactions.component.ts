import { Component, Input, ViewChild } from '@angular/core';
import { ProductViewComponent } from '../product-view/product-view.component';
import { EntityGroup } from '../../../entities/entity.group';
import { Product } from '../../interface/product';
import { Paginable } from '../../../util/paginable';
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
        ObjectParameters.newParameters()
        .page(this.controller.page)
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

}
