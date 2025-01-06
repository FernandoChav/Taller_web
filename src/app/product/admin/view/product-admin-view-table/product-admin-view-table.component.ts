import { Component } from '@angular/core';
import { AdminProductServiceShared } from '../../service/admin.product.service.shared';
import { ProductService } from '../../../service/product.service';
import { NgFor } from '@angular/common';
import { RequestUpdateProduct } from '../../interface/request.update.product';
import { Product } from '../../../interface/product';
import { Router } from '@angular/router';

/**
 * This component represent the table for manage the users as administrator 
 */

@Component({
  selector: 'app-product-admin-view-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-admin-view-table.component.html',
  styleUrl: './product-admin-view-table.component.css'
})
export class ProductAdminViewTableComponent {

  /**
   * This is a map that contains a way for represent a number as string product name 
   */

  private productNumberToString : Map<number, string> = new Map<number, string>()
  .set(0, "Polera")
  .set(1, "Gorro")
  .set(2, "Juguetería")
  .set(3, "Alimentación")
  .set(4, "Libro");

  constructor(public serviceShared : AdminProductServiceShared,
      public productService : ProductService,
    public requestUpdateProduct : RequestUpdateProduct,
  private router: Router) {}

  /**
   * Update all products, searched from http requets
   */

  private update() {
    this.productService.query(
        this.serviceShared.parameters()
    ).forEach(promise => {
      this.serviceShared.group = promise;
    });
  }

  /**
   * Delete a product from product id
   * @param productId the product id for delete
   */

  deleteProduct(productId : number) {
    this.productService.delete(productId)
    .forEach(next => {
      this.serviceShared.resetPage();
      this.update();
    });
  }

  /**
   * Go to section edit product and save the product 
   * @param product the product for edit
   */

  editProduct(product : Product) {
    this.requestUpdateProduct.product = product;
    this.router.navigate(['/edit-product']);
  }


  /**
   * Convert a number product to string product 
   * @param value the number value 
   * @returns the product type name
   */

  public translateProductType(value : number) {
    return this.productNumberToString.get(value);
  }

}
