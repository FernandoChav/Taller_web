import { AbstractControl, ValidationErrors } from "@angular/forms";

/**
 * This is validator for reactive for, for validate if a field is a number
 * @param control the field entered
 * @returns  a response if the field is number 
 */

export function numericValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value && isNaN(value)) {
      var n : number = value;
      if(n > 0) {
        return { numeric: true }; 
      }
    }

    return null; 


}