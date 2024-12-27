import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EntityGroup } from '../../../entities/entity.group';
import { Product } from '../../interface/product';
import { NgFor } from '@angular/common';
import { ProductViewComponent } from '../product-view/product-view.component';
import { ProductController } from '../../controller/product.controller';

@Component({
  selector: 'app-product-view-table',
  imports: [NgFor],
  templateUrl: './product-view-table.component.html',
  styleUrl: './product-view-table.component.css',
  standalone: true
})
export class ProductViewTableComponent {

  readonly controller : ProductController;
  
  constructor(controller : ProductController) {
    this.controller = controller;
  }

}
