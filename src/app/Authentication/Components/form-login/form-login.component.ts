import { Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticatedService } from '../../Services/authenticated.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { User } from '../../../user/interface/user';
import { SessionService } from '../../../user/service/session.service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  router = inject(Router);
  form! : FormGroup;
  private authenticatedService = inject(AuthenticatedService);
  private storageService = inject(LocalStorageService);
  private sessionService = inject(SessionService);
  loginAlert: boolean = false;
  error : boolean = false;
  errorMesage : string[] = [];

  constructor(private fb: FormBuilder) {
    this.formulario();
  }
  formulario(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]] 
    });
  }

  get emailValidate() { return this.form.get('email')?.invalid && this.form.get('email')?.touched; }

  get passwordValidate() { return this.form.get('password')?.invalid && this.form.get('password')?.touched; }



  async login(){
    console.log(this.form.invalid);
    if (this.form.invalid) {
       Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log(this.form.value);
      console.log("Formulario invalido");
      return;
    }
    try {
      console.log(this.form.value);
      const response = await this.authenticatedService.login(this.form.value);
      
      this.sessionService.store(response.userView);

      if (response.token.tokenContent != "") {
        this.storageService.setVar('token', response.token.tokenContent);
        this.storageService.setVar('role', response.role.name);
        this.loginAlert = true;
        this.error = false;
        this.errorMesage = [];
        this.errorMesage.push("Login exitoso");

        // Retarda la redirección para que el usuario vea el mensaje
        setTimeout(() => {
          if (this.storageService.getVar('role') === 'Administrator') {
            this.router.navigate(['user']);
          } else {
            this.router.navigate(['']);
          }
        }, 2000);

      } 
    } catch (error: any) {
      if (error.status === 400) {
        this.error = true;
        this.loginAlert = false;
        this.errorMesage = [error.error.message]; // Mensaje específico del backend
      } else {
        // Si es un error no esperado, muestra un mensaje genérico
        this.error = true;
        this.loginAlert = false;
        this.errorMesage = ["Error interno del servidor"];
      }
    }
  }

}
