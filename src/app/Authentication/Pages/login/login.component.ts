import { Component, inject } from '@angular/core';
import { FormLoginComponent } from "../../Components/form-login/form-login.component";
import { AuthenticatedService } from '../../Services/authenticated.service';
import { NavbarComponent } from "../../Components/navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormLoginComponent, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  
  
  
}
