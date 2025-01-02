import { Component } from '@angular/core';
import { UserPanelSidebarComponent } from '../user-panel-sidebar/user-panel-sidebar.component';

@Component({
  selector: 'app-user-panel-view',
  standalone: true,
  imports: [UserPanelSidebarComponent],
  templateUrl: './user-panel-view.component.html',
  styleUrl: './user-panel-view.component.css',
})
export class UserPanelViewComponent {

}
