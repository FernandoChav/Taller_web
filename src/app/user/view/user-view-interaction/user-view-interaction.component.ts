import { Component } from '@angular/core';
import { UserController } from '../controller/user.controller';

@Component({
  selector: 'app-user-view-interaction',
  standalone: true,
  imports: [],
  templateUrl: './user-view-interaction.component.html',
  styleUrl: './user-view-interaction.component.css'
})
export class UserViewInteractionComponent {

  constructor(public controller : UserController) {}

  nextPage() {

  }

  previousPage() {

  }

  onSearch(event : Event) {

  }

}
