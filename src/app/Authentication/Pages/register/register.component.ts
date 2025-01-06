import { Component } from '@angular/core';
import { FormLoginComponent } from "../../Components/form-login/form-login.component";
import { FormRegisterComponent } from "../../Components/form-register/form-register.component";
import { NavbarComponent } from "../../Components/navbar/navbar.component";

/**
 * This is a component for make a register requets, contains a form for send the requets
 */

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormRegisterComponent, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
}
