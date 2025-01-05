import { AbstractControl, ValidationErrors } from "@angular/forms";

export function numericValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    console.log("VALIDATOR NUMERIC");
    if (value && isNaN(value)) {
      var n : number = value;
      if(n > 0) {
        return { numeric: true }; 
      }
    }
    console.log("NULL");
    return null; 


}