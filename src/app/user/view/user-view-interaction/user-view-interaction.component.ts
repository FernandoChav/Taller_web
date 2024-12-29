import { Component } from '@angular/core';
import { UserController } from '../controller/user.controller';
import { UserService } from '../../service/user.service';
import { HttpHeaderUtil } from '../../../util/http.header.util';

@Component({
  selector: 'app-user-view-interaction',
  standalone: true,
  imports: [],
  templateUrl: './user-view-interaction.component.html',
  styleUrl: './user-view-interaction.component.css'
})
export class UserViewInteractionComponent {

  constructor(public controller : UserController,
    private userService : UserService
  ) {}

  nextPage() {

  }

  previousPage() {

  }

  onSearch(event : Event) {
      this.controller.resetPage();
      
      const input = event.target as HTMLInputElement; 
      this.controller.searchByName = input.value;

      console.log("HOLA");

      this.userService.query(
          this.controller.parameters(), HttpHeaderUtil.asBearToken("token")
      ).forEach(next => {
        console.log("QUERYY");
        this.controller.group = next;
      }, );
  }

}
