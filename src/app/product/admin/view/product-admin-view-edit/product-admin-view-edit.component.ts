import { Component, OnInit } from '@angular/core';
import { RequestUpdateProduct } from '../../interface/request.update.product';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { numericValidator } from '../../../../util/custom.validator';
import { ObjectParameters } from '../../../../entities/object.parameters';
import { ProductService } from '../../../service/product.service';
import { HttpHeaderUtil } from '../../../../util/http.header.util';

@Component({
  selector: 'app-product-admin-view-edit',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './product-admin-view-edit.component.html',
  styleUrl: './product-admin-view-edit.component.css'
})
export class ProductAdminViewEditComponent implements OnInit {

  forms!: FormGroup;
  userId : number = 0;

  constructor(private formBuilder : FormBuilder,
    private requestsUpdateProduct : RequestUpdateProduct,
  private productService : ProductService) {}
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() : void {
      this.forms = this.formBuilder.group({
        productName : ['', [Validators.minLength(10), Validators.maxLength(64)]],
        stock : ['', [Validators.pattern("^[0-9]*$")]],
        price : ['', [Validators.pattern("^[0-9]*$")]],
        typeProduct : ['', []]
      });
  }

  productName() {
    return this.forms.get('productName');
  }

  stock() {
    return this.forms.get('stock');
  }

  price() {
    return this.forms.get('price');
  }

  typeProduct() {
    return this.forms.get('typeProduct');
  }

  async onSubmit() {
    var parameters = ObjectParameters.newParameters();

    if(this.productName()?.value != ""){
      parameters.add("Name", this.productName()?.value);
    }

    if(this.price()?.value != ""){
      parameters.add("Price", this.price()?.value);
    }

    if(this.stock()?.value != ""){
      parameters.add("Stock", this.stock()?.value);
    }

    if(this.typeProduct()?.value != ""){
      parameters.add("TypeProduct", this.typeProduct()?.value);
    }

    this.productService.update(this.userId, parameters, 
        HttpHeaderUtil.asBearToken("")
    ).forEach(next => {
        console.log("UPDATED " + next);
    });
  }


}
