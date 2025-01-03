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

  update() {
    this.userService.query(
      this.controller.parameters(), HttpHeaderUtil.asBearToken("token")
  ).forEach(next => {
    this.controller.group = next;
  }, );
  }

  nextPage() {
      this.controller.page++;
      this.update();
  }

  previousPage() {
      this.controller.page--;
      this.update();
  }

  onSearch(event : Event) {
      this.controller.resetPage();
      
      const input = event.target as HTMLInputElement; 
      this.controller.searchByName = input.value;
      this.update();
  }

}
