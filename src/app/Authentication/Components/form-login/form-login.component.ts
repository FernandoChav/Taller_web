import { Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticatedService } from '../../Services/authenticated.service';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  form! : FormGroup;
  private authenticatedService = inject(AuthenticatedService);
  private storageService = inject(LocalStorageService);
  loginAlert: boolean = false;
  error : boolean = false;
  errorMesage : string[] = [];

  constructor(private fb: FormBuilder) {
    this.formulario();
  }
  formulario(){
    this.form = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)] 
    });
  }

  get emailValidate() { return this.form.get('email')?.invalid && this.form.get('email')?.touched; }

  get passwordValidate() { return this.form.get('password')?.invalid && this.form.get('password')?.touched; }

  async login(){
    if (this.form.invalid) {
       Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    try {
      const response = await this.authenticatedService.login(this.form.value);

      
      if (response.tokenContent) {
        this.storageService.setVar('token', response.tokenContent);
        this.storageService.setVar('role', response.role.name);
        console.log('Login success', this.storageService.getVar('token'));

      } 
    } catch (error: any) {
      this.error = true;
      this.errorMesage.push(error);
      console.log(error);
    }
  }

}
