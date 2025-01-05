import { Component, OnInit } from '@angular/core';
import { RequestUpdateProduct } from '../../interface/request.update.product';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { numericValidator } from '../../../../util/custom.validator';
import { ObjectParameters } from '../../../../entities/object.parameters';
import { ProductService } from '../../../service/product.service';
import { HttpHeaderUtil } from '../../../../util/http.header.util';
import { Product } from '../../../interface/product';
import { NavbarComponent } from '../../../../Authentication/Components/navbar/navbar.component';
import { FooterComponent } from '../../../../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-admin-view-edit',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
  NavbarComponent,
FooterComponent],
  templateUrl: './product-admin-view-edit.component.html',
  styleUrl: './product-admin-view-edit.component.css'
})
export class ProductAdminViewEditComponent implements OnInit {

  private productNumberToString : Map<number, string> = new Map<number, string>()
  .set(0, "Polera")
  .set(1, "Gorro")
  .set(2, "Juguetería")
  .set(3, "Alimentación")
  .set(4, "Libro");

  private readonly typesProductToInt = new Map<string, number>()
    .set("Polera", 0)
    .set("Gorro", 1)
    .set("Juguetería", 2)
    .set("Alimentación", 3)
    .set("Libro", 4);

  forms!: FormGroup;
  productId : number = 0;
  product : Product | undefined;

  constructor(private formBuilder : FormBuilder,
    private requestsUpdateProduct : RequestUpdateProduct,
    private productService : ProductService,
  private router : Router) {
    this.product = requestsUpdateProduct.product;
    
    if(this.product === undefined){
      this.productId = 0;
      return;
    } 
    this.productId = this.product?.id;
  }
  
  ngOnInit(): void {
    this.createForm();

    this.forms.patchValue({
      productName : this.product?.name,
      stock : this.product?.stock,
      price : this.product?.price,
      typeProduct : this.translateProductType(this.product?.productType)
    });
  }

  createForm() : void {
      this.forms = this.formBuilder.group({
        productName : ['', [Validators.minLength(10), Validators.maxLength(64)]],
        stock : ['', [Validators.pattern("^[0-9]*$")]],
        price : ['', [Validators.pattern("^[0-9]*$")]],
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

  isValidAllFields(){
    return !this.productName()?.invalid &&
    !this.stock()?.invalid &&
    !this.price()?.invalid 
  }

  async onSubmit() {
    
    var typeProductAsInt = this.translateToIntProductType(this.typeProduct()?.value);
    

    this.productService.updatePost(this.productId,
      this.productName()?.value,
      this.price()?.value,
      this.stock()?.value, 
      typeProductAsInt,
      this.file()?.value
    ).subscribe({
      next: () => {
        alert("Producto actualizado");
      },
      error: () => {
        alert("Error actualizando el producto");
      }
    })
  }

  public translateProductType(value : number | undefined) : string {
    if(value === undefined){
      return "Gorro";
    }

    let response = this.productNumberToString.get(value);
    if(response === undefined){
      return "Gorro";
    }
    return response;
  }

  public translateToIntProductType(value : string) : number  {
    let response = this.typesProductToInt.get(value);
    if(response == undefined){
      return 0;
    }
    return response;
  }

  back() {
    this.router.navigate(['product-admin']);
  }

  onFileChange(event : Event) : void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.forms.patchValue({ file }); 
    }
  }

}
