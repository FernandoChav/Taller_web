import { Component } from '@angular/core';
import { FormLoginComponent } from "../../Components/form-login/form-login.component";
import { FormRegisterComponent } from "../../Components/form-register/form-register.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormRegisterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
}
