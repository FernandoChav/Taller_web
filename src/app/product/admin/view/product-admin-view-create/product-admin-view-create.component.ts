import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { CommonModule, NgIf } from '@angular/common';
import { TypesUtil } from '../../../../util/types.util';
import { HttpHeaderUtil } from '../../../../util/http.header.util';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../../Authentication/Components/navbar/navbar.component';
import { FooterComponent } from '../../../../footer/footer.component';

/**
 * This componet is used for create a new product, contains a form
 */

@Component({
  selector: 'app-product-admin-view-create',
  standalone: true,
  imports: [CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NavbarComponent,
      FooterComponent,
    NgIf],
  templateUrl: './product-admin-view-create.component.html',
  styleUrl: './product-admin-view-create.component.css'
})
export class ProductAdminViewCreateComponent implements OnInit {

  /**
   * The form 
   */

  forms!: FormGroup;

  /**
   * A boolean that represent if the product if created
   */

  productAdded : boolean = false;

  /**
   * A product that represent is failed trying add
   */

  productFailedTryingAdd : boolean = false;

  constructor(private formBuilder : FormBuilder, 
    private productService : ProductService,
    private router: Router
  ) {}

  /**
   * The method for init, this call for create form
   */

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Used when is uploaded the file and add it to the form
   * @param event the event
   */

  onFileChange(event : Event) : void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.forms.patchValue({ file }); 
    }
  }

  /**
   * Create the form based en her parameters
   */

  createForm() : void {
     this.forms = this.formBuilder.group({
        productName : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(64)]],
        stock : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        price : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        typeProduct : ['', []],
        file : [null]
      });
  }

  /**
   * Return the product name
   * @returns the product name
   */

  productName() {
    return this.forms.get('productName');
  }

  /**
   * Return the stock
   * @returns the stock
   */

  stock() {
    return this.forms.get('stock');
  }

  /**
   * Return the price
   * @returns the price
   */

  price() {
    return this.forms.get('price');
  }

  /**
   * Return the type product
   * @returns the type product
   */

  typeProduct() {
    return this.forms.get('typeProduct');
  }

  /**
   * Return the file 
   * @returns  the file 
   */

  file() {
    return this.forms.get('file');
  }
  
  /**
   * Clear all fields it used when is creaded a product
   */

  clear() {
    this.productName()?.reset();
    this.stock()?.reset();
    this.price()?.reset();
    this.typeProduct()?.reset();
    this.file()?.reset();
  }

  /**
   * Check if all fields are valid
   * @returns a boolean that contains if all fields are valid  
   */

  isValidAllFields() {
    return !this.productName()?.invalid &&
    !this.stock()?.invalid && 
    !this.price()?.invalid &&
    !this.file()?.invalid 
  }

  /**
   * This method is called when the user click the button and send a requets for create the product
   */

  async onSubmit() {

    var productName = this.productName()?.value;
    var stock = this.stock()?.value;
    var price = this.price()?.value;
    var typeProduct = TypesUtil.productTypeToNumber(this.typeProduct()?.value);
    var file = this.file()?.value;

    this.productService.post(productName, stock, price, typeProduct.toString(), file)
    .subscribe({
      next: () => {
        this.productAdded = true;
        setTimeout(() => {
          this.productAdded = false;
          this.clear();
          this.router.navigate(['/product-admin']);
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
