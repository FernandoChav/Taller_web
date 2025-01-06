import { Component } from '@angular/core';
import { UserController } from '../controller/user.controller';
import { UserService } from '../../service/user.service';
import { HttpHeaderUtil } from '../../../util/http.header.util';

/**
 * This componet manage interactions for search users, change the 
 * page and filter 
 */

@Component({
  selector: 'app-user-view-interaction',
  standalone: true,
  imports: [],
  templateUrl: './user-view-interaction.component.html',
  styleUrl: './user-view-interaction.component.css'
})
export class UserViewInteractionComponent {

  /**
   * The main constructor, is used for inject the next dependecies:
   * @param controller a controller-service for shared resources
   * @param userService a user service
   */

  constructor(public controller : UserController,
    private userService : UserService
  ) {}

  /**
   * Update cached products 
   */

  update() {
    this.userService.query(
      this.controller.parameters()
  ).forEach(next => {
    this.controller.group = next;
  }, );
  }

  /**
   * Move the next page
   */

  nextPage() {
      this.controller.page++;
      this.update();
  }

  /**
   * Move the previous page
   */

  previousPage() {
      this.controller.page--;
      this.update();
  }

  /**
   * Search a product
   * @param event the event when is searched in a input
   */

  onSearch(event : Event) {
      this.controller.resetPage();
      
      const input = event.target as HTMLInputElement; 
      this.controller.searchByName = input.value;
      this.update();
  }

}
