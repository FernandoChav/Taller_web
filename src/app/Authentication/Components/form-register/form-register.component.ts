import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticatedService } from '../../Services/authenticated.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

/**
 * This is a component for make a register requets, contains a form for send the requets
 */


@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {

     /**
   * This is reactive form
   */

    form! : FormGroup;
    private authenticatedService = inject(AuthenticatedService);

    /**
     * This is the storage service 
     */

    private storageService = inject(LocalStorageService);

    /**
   * This is a boolean that show is registered sucessful
   */
    
    registerAlert: boolean = false;

 /**
   * This is a boolean that show is failed to register
   */

    error : boolean = false;

  /**
   * Contains the error message
   */

    errorMesage : string[] = [];

  /**
   * This is a map for manage gender as numbers
   */

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
    
     /**
   * This method create the form 
   */

    formulario(){
        this.form = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
          birthdate: ['', [Validators.required, this.birthdateNotInFutureValidator()]],
          rut: ['', [Validators.required,]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
          genderType: ['', [Validators.required,]],
          repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
          
        },
        {
          validators: this.passwordMatchValidator()
        }
      );
      }

    /**
     * Check if the field email is validate
     */

    get emailValidate() { return this.form.get('email')?.invalid && this.form.get('email')?.touched; }

    /**
     * Check if the password is validate
     */

    get passwordValidate() { return this.form.get('password')?.invalid && this.form.get('password')?.touched; }

      /**
       * Check if the name is validate
       */

    get nameValidate() { return this.form.get('name')?.invalid && this.form.get('name')?.touched; }

      /**
       * Check if the birthdate is validate
       */

    get birthdateValidate() { return this.form.get('birthdate')?.invalid && this.form.get('birthdate')?.touched; }

    /**
     * This is valdiator for check if the password match 
     * @returns a response true or false if the password match
     */

    passwordMatchValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')?.value;
        const repeatPassword = control.get('repeatPassword')?.value;
        
        if (password && repeatPassword && password !== repeatPassword) {
          return { 'passwordsDoNotMatch': true };
        }
        
        return null;
      }};

      /**
       * This is a validator for check if a date is not future to
       * actual date
       * @returns a boolean isthe birthdate is true o false
       */

      birthdateNotInFutureValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const today = new Date();
          const birthdate = control.value ? new Date(control.value) : null;
      
          // Verifica si la fecha es futura
          if (birthdate && birthdate > today) {
            return { 'birthdateInFuture': true };
          }
      
          return null;
        };
      }

    /**
     * Make a register using the date from form
     * @returns  void 
     */

    async register(){
        if (this.form.invalid) {
            Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
            });
            console.log('form invalido');
            return;
        }
        try {
            
            // Obtener el valor del formulario
            const formData = this.form.value;

            // Convertir la fecha al formato "YYYY-MM-DD"
            if (formData instanceof Date) console.log("es de tipo date");

            console.log(formData.birthdate);
            

            // Crear el objeto de datos que se enviará al backend
            
            const selectedGender = this.form.value.genderType; // Asegúrate de que el nombre coincida con el campo del formulario

            // Convertir el género al valor numérico esperado por el backend
            const genderValue = this.genderMapping[selectedGender.toLowerCase()];
            

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
          if (error.status === 400) {
            // Si el error es un error de validación (400), mostramos los mensajes específicos
            this.errorMesage.push('Error en el registro: ' + error.error);
          } else if (error.status === 500) {
            // Si es un error interno del servidor (500), mostramos un mensaje genérico
            this.errorMesage.push('Error inesperado en el servidor. Por favor, intente más tarde.');
          } else {
            // Para otros errores
            this.errorMesage.push('Ocurrió un error. Intente nuevamente.');
          }
          console.log(error);
        }
    }

}
