import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticatedService } from '../../Services/authenticated.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {
    form! : FormGroup;
    private authenticatedService = inject(AuthenticatedService);
    private storageService = inject(LocalStorageService);
    registerAlert: boolean = false;
    error : boolean = false;
    errorMesage : string[] = [];
    genderMapping: { [key: string]: number } = {
      femenino: 0, // Female
      masculino: 1, // Male
      otro: 2,      // Other
      no_especificado: 3, // NotSpecified (opcional)
    };
  passwordMatch: boolean = false;

    constructor(private fb: FormBuilder) {
        this.formulario();
      }
    
    formulario(){
        this.form = this.fb.group({
          name: ['', Validators.required, Validators.minLength(8), Validators.maxLength(255)],
          birthdate: ['', Validators.required,],
          rut: ['', Validators.required,],
          email: ['', Validators.required, Validators.email],
          password: ['', Validators.required, Validators.minLength(8), Validators.maxLength(20)],
          genderType: ['', Validators.required,],
          repeatPassword: ['', Validators.required, Validators.minLength(8), Validators.maxLength(20)],
          
        });
      }
    get emailValidate() { return this.form.get('email')?.invalid && this.form.get('email')?.touched; }

    get passwordValidate() { return this.form.get('password')?.invalid && this.form.get('password')?.touched; }

    get nameValidate() { return this.form.get('name')?.invalid && this.form.get('name')?.touched; }
    get birthdateValidate() { return this.form.get('birthdate')?.invalid && this.form.get('birthdate')?.touched; }
    async register(){
        if (this.form.invalid) {
            Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
            });
            return;
        }
        try {
            const password = this.form.value.password;
            const repeatPassword = this.form.value.repeatPassword;
            if (password !== repeatPassword) {
              this.error = true;
              this.errorMesage.push('Las contraseñas no coinciden.');
              return;
          }
            // Obtener el valor del formulario
            const formData = this.form.value;

            // Convertir la fecha al formato "YYYY-MM-DD"
            if (formData instanceof Date) console.log("es de tipo date");

            console.log(formData.birthdate);
            

            // Crear el objeto de datos que se enviará al backend
            
            const selectedGender = this.form.value.genderType; // Asegúrate de que el nombre coincida con el campo del formulario

            // Convertir el género al valor numérico esperado por el backend
            const genderValue = this.genderMapping[selectedGender.toLowerCase()];
            console.log(genderValue);
            if (genderValue === undefined) {
              this.errorMesage.push('Seleccione un género válido.');
              return;
            }

            // Crear el objeto de datos que se enviará al backend
            const requestData = {
              ...this.form.value,
              genderType: genderValue,
              
            };
            console.log(requestData);
            const response = await this.authenticatedService.register(requestData);

            if (response) {
                this.registerAlert = true;
            }
        } catch (error: any) {
            this.error = true;
            this.errorMesage.push(error);
            console.log(error);
        }
    }

}
