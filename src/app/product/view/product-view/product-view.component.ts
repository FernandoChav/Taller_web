import { Component, OnInit } from '@angular/core';
import { ProductViewTableComponent } from '../product-view-table/product-view-table.component';
import { ProductViewInteractionsComponent } from '../product-view-interactions/product-view-interactions.component';
import { ProductService } from '../../service/product.service';
import { EntityGroup } from '../../../entities/entity.group';
import { Product } from '../../interface/product';
import { Paginable } from '../../../util/paginable';
import { ObjectParameters } from '../../../entities/object.parameters';
import { ProductController } from '../../controller/product.controller';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [ProductViewTableComponent, 
    ProductViewInteractionsComponent
    ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit {

  private readonly productService : ProductService;
  private readonly controller : ProductController;

  constructor(productService : ProductService,
    controller : ProductController
  ) {
    this.productService = productService;
    this.controller = controller;
  }

  ngOnInit(): void {
    this.productService.query(
      ObjectParameters.newParameters()
      .page(this.controller.page)
    )
    .forEach(promise => {
      this.controller.group = promise;
    });
  }

}
