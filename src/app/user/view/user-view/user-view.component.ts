import { Component, OnInit } from '@angular/core';
import { UserViewTableComponent } from '../user-view-table/user-view-table.component';
import { UserService } from '../../service/user.service';
import { HttpHeaderUtil } from '../../../util/http.header.util';
import { UserController } from '../controller/user.controller';
import { UserViewInteractionComponent } from '../user-view-interaction/user-view-interaction.component';
import { NavbarComponent } from "../../../Authentication/Components/navbar/navbar.component";
import { FooterComponent } from '../../../footer/footer.component';

/**
 * This is general component that contains the table for show users and her interactions
 */

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [UserViewTableComponent,
    UserViewInteractionComponent, NavbarComponent, FooterComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnInit {

  /**
   * The main constructor, it used for inject dependencies
   * @param userService the user service
   * @param userController a controller-service for shared values
   */

  public constructor(private userService : UserService,
    private userController : UserController
  ) {
  }

  /**
   * Load initial users for shared en her components
   */

  ngOnInit(): void {
    this.userService.all()
    .forEach(next => {
        this.userController.group = next;
    });
  }

}
