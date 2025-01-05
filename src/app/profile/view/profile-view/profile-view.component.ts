import { Component } from '@angular/core';
import { NavbarComponent } from "../../../Authentication/Components/navbar/navbar.component";

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {

}
