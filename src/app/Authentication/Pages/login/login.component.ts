import { Component, inject } from '@angular/core';
import { FormLoginComponent } from "../../Components/form-login/form-login.component";
import { AuthenticatedService } from '../../Services/authenticated.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  
  
  
}
