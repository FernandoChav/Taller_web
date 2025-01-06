import { Component } from '@angular/core';
import { NavbarComponent } from "../../../Authentication/Components/navbar/navbar.component";
import { Router } from '@angular/router';
import { User } from '../../../user/interface/user';
import { SessionService } from '../../../user/service/session.service';

/**
 * This component represent the information about the logged user
 */

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {

  /**
   * This is a dictionary that convert to number to string, where the string
   * is a gender
   */

  private numberAsGender : Map<number, string> = new Map().set(0, "Masculino") 
  .set(1, "Femenino")
  .set(2, "Prefiero no decirlo")
  .set(3, "Otro");

  /**
   * The user for show data
   */

  private user : User;

  /**
   * This is the main constructor
   * @param router the router for navigate
   * @param sessionService the session service where is allocated the user
   */

  constructor(private router: Router,
    private sessionService : SessionService
  ) {
    this.user = sessionService.get();
    console.log(this.user);
  }

  /**
   * Redirect to section for edit the profile
   */

  redirectUserEdit() {
      this.router.navigate(['profile-edit']);
  }

  /**
   * Using the map above convert a number to gender as string 
   * @param genderAsNumber the gender as number
   * @returns the gender converted
   */

  public translateGender(genderAsNumber : number) : string | undefined {
    return this.numberAsGender.get(genderAsNumber);
  }

  /**
   * Get the logged user
   * @returns the logged user
   */

  getUser() : User {
    return this.user;
  }

}
