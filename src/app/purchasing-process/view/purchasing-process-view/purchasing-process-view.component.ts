import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchasing-process-view',
  standalone: true,
  imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
      NgIf],
  templateUrl: './purchasing-process-view.component.html',
  styleUrl: './purchasing-process-view.component.css'
})
export class PurchasingProcessViewComponent implements OnInit {

  forms!: FormGroup;

  constructor(private formBuilder : FormBuilder ){
    this.formBuilder = formBuilder;    
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() : void {
    this.forms = this.formBuilder.group({
      "country": ['', [Validators.required]],
      "city": ['', [Validators.required]],
      "commune": ['', [Validators.required]],
      "street": ['', [Validators.required]]
    });
  }

  public country() {
    return this.forms.get("country");
  }

  public city() {
    return this.forms.get("city");
  }

  public commune() {
    return this.forms.get('commune');
  }
  
  public street() {
    return this.forms.get('street');
  }

  isValidAlFields() : boolean {
    return false;
  }

  isValidAllFields() : boolean {
    return false;
  }

  async onSubmit() {

  }

}
