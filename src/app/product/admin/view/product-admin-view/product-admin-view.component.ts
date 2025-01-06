import { Component, OnInit } from '@angular/core';
import { AdminProductServiceShared } from '../../service/admin.product.service.shared';
import { ProductService } from '../../../service/product.service';
import { ObjectParameters } from '../../../../entities/object.parameters';
import { ProductAdminViewTableComponent } from '../product-admin-view-table/product-admin-view-table.component';
import { ProductAdminViewInteractionsComponent } from '../product-admin-view-interactions/product-admin-view-interactions.component';
import { NavbarComponent } from '../../../../Authentication/Components/navbar/navbar.component';
import { FooterComponent } from '../../../../footer/footer.component';

/**
 * This is the main components for rende1r a admin product manager
 */

@Component({
  selector: 'app-product-admin-view',
  standalone: true,
  imports: [ProductAdminViewTableComponent,
    ProductAdminViewInteractionsComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './product-admin-view.component.html',
  styleUrl: './product-admin-view.component.css'
})
export class ProductAdminViewComponent implements OnInit {

  constructor(public serviceShared : AdminProductServiceShared,
    public productService : ProductService
  ) {}

  /**
   * This method load the first products in cache
   */

  ngOnInit(): void {
      
      this.productService.query(
        ObjectParameters.newParameters()
        .page(this.serviceShared.page)
      )
      .forEach(promise => {
        this.serviceShared.group = promise;
      });
    }

}
