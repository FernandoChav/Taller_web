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

/**
 * This component is used when a product is edited 
 */

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

  /**
   * A map that contains the representation product numeric to product type string
   */

  private productNumberToString : Map<number, string> = new Map<number, string>()
  .set(0, "Polera")
  .set(1, "Gorro")
  .set(2, "Juguetería")
  .set(3, "Alimentación")
  .set(4, "Libro");

  /**
   * A map that contains the represention to product type string to product numeric
   */

  private readonly typesProductToInt = new Map<string, number>()
    .set("Polera", 0)
    .set("Gorro", 1)
    .set("Juguetería", 2)
    .set("Alimentación", 3)
    .set("Libro", 4);

  /**
   * The forms
   */

  forms!: FormGroup;

  /**
   * The product user id for edit
   */

  productId : number = 0;

  /**
   * The product data for edit
   */

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
  
  /**
   * This method is used when the component start,
   *  this call for create the form and assign the product data in form
   */

  ngOnInit(): void {
    this.createForm();

    this.forms.patchValue({
      productName : this.product?.name,
      stock : this.product?.stock,
      price : this.product?.price,
      typeProduct : this.translateProductType(this.product?.productType)
    });
  }

  /**
   * Create a form 
   */

  createForm() : void {
      this.forms = this.formBuilder.group({
        productName : ['', [Validators.minLength(10), Validators.maxLength(64)]],
        stock : ['', [Validators.pattern("^[0-9]*$")]],
        price : ['', [Validators.pattern("^[0-9]*$")]],
        typeProduct : ['', []],
        file : [null]
      });
  }

  /**
   * Get the product name
   * @returns the product name
   */

  productName() {
    return this.forms.get('productName');
  }

  /**
   * Get the stock
   * @returns the stock
   */

  stock() {
    return this.forms.get('stock');
  }

  /**
   * Get the price
   * @returns the price
   */

  price() {
    return this.forms.get('price');
  }

  /**
   * Get the type product
   * @returns  the type product
   */

  typeProduct() {
    return this.forms.get('typeProduct');
  }

  /**
   * Get the file product
   * @returns the file product
   */

  file() {
    return this.forms.get('file');
  }

  /**
   * Check if all fields are valid 
   * @returns a boolean that if all fields are valid
   */

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

  /**
   * Convert a product to number to product type string 
   * @param value 
   * @returns 
   */

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

  /**
   * Convert a product type string to product type number
   * @param value 
   * @returns 
   */

  public translateToIntProductType(value : string) : number  {
    let response = this.typesProductToInt.get(value);
    if(response == undefined){
      return 0;
    }
    return response;
  }

  /**
   * This method go to product-admin page
   */

  back() {
    this.router.navigate(['product-admin']);
  }

  /**
   * This method is invoked when a new file is added and it is added form 
   * @param event the event
   */

  onFileChange(event : Event) : void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.forms.patchValue({ file }); 
    }
  }

}
