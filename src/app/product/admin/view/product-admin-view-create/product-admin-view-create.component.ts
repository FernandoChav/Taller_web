import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { CommonModule, NgIf } from '@angular/common';
import { TypesUtil } from '../../../../util/types.util';
import { HttpHeaderUtil } from '../../../../util/http.header.util';

@Component({
  selector: 'app-product-admin-view-create',
  standalone: true,
  imports: [CommonModule,
      FormsModule,
      ReactiveFormsModule,
    NgIf],
  templateUrl: './product-admin-view-create.component.html',
  styleUrl: './product-admin-view-create.component.css'
})
export class ProductAdminViewCreateComponent implements OnInit {

  forms!: FormGroup;
  productAdded : boolean = false;
  productFailedTryingAdd : boolean = false;

  constructor(private formBuilder : FormBuilder, 
    private productService : ProductService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  onFileChange(event : Event) : void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.forms.patchValue({ file }); // Actualiza el control con el archivo seleccionado
    }
  }

  createForm() : void {
     this.forms = this.formBuilder.group({
        productName : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(64)]],
        stock : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        price : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        typeProduct : ['', []],
        file : [null]
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

  file() {
    return this.forms.get('file');
  }

  clear() {
    this.productName()?.reset();
    this.stock()?.reset();
    this.price()?.reset();
    this.typeProduct()?.reset();
    this.file()?.reset();
  }

  isValidAllFields() {
    return !this.productName()?.invalid &&
    !this.stock()?.invalid && 
    !this.price()?.invalid &&
    !this.file()?.invalid 
  }

  async onSubmit() {

    var productName = this.productName()?.value;
    var stock = this.stock()?.value;
    var price = this.price()?.value;
    var typeProduct = TypesUtil.productTypeToNumber(this.typeProduct()?.value);
    var file = this.file()?.value;

    this.productService.post(productName, stock, price, typeProduct.toString(), file, HttpHeaderUtil.asBearToken("") )
    .subscribe({
      next: () => {
        this.productAdded = true;
        setTimeout(() => {
          this.productAdded = false;
          this.clear();
          // redirect page
        }, 5000);
      },
      error:  () => {
        this.productFailedTryingAdd = true;

        setTimeout(() => {
            this.clear();
            this.productFailedTryingAdd = false;
        }, 5000);
      }
    })


  }

}
