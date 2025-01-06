import { Component } from '@angular/core';
import { UserPanelSidebarComponent } from '../user-panel-sidebar/user-panel-sidebar.component';
import { UserPanelEditComponent } from '../user-panel-edit/user-panel-edit.component';

/**
 * This is the main component for render a user panel that contains
 * settings and information
 */

@Component({
  selector: 'app-user-panel-view',
  standalone: true,
  imports: [UserPanelSidebarComponent, UserPanelEditComponent],
  templateUrl: './user-panel-view.component.html',
  styleUrl: './user-panel-view.component.css',
})
export class UserPanelViewComponent {

}
