import { Component } from '@angular/core';
import { AdminProductServiceShared } from '../../service/admin.product.service.shared';
import { ProductService } from '../../../service/product.service';
import { NgFor } from '@angular/common';
import { RequestUpdateProduct } from '../../interface/request.update.product';
import { Product } from '../../../interface/product';

@Component({
  selector: 'app-product-admin-view-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-admin-view-table.component.html',
  styleUrl: './product-admin-view-table.component.css'
})
export class ProductAdminViewTableComponent {

  constructor(public serviceShared : AdminProductServiceShared,
      public productService : ProductService,
    public requestUpdateProduct : RequestUpdateProduct) {}

  private update() {
    this.productService.query(
        this.serviceShared.parameters()
    ).forEach(promise => {
      this.serviceShared.group = promise;
    });
  }

  deleteProduct(productId : number) {
    this.productService.delete(productId)
    .forEach(next => {
      this.serviceShared.resetPage();
      this.update();
    });
  }

  editProduct(product : Product) {
    this.requestUpdateProduct.product = product;
    
  }

}
