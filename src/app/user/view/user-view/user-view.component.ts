import { Component, OnInit } from '@angular/core';
import { UserViewTableComponent } from '../user-view-table/user-view-table.component';
import { UserService } from '../../service/user.service';
import { HttpHeaderUtil } from '../../../util/http.header.util';
import { UserController } from '../controller/user.controller';
import { UserViewInteractionComponent } from '../user-view-interaction/user-view-interaction.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [UserViewTableComponent,
    UserViewInteractionComponent
  ],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnInit {

  public constructor(private userService : UserService,
    private userController : UserController
  ) {
  }

  ngOnInit(): void {
    this.userService.all(
        HttpHeaderUtil.asBearToken("token")
    )
    .forEach(next => {
        this.userController.group = next;
    });
  }

}
