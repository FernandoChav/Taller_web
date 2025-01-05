import { Component } from '@angular/core';
import { NavbarComponent } from "../../../Authentication/Components/navbar/navbar.component";
import { Router } from '@angular/router';
import { User } from '../../../user/interface/user';
import { SessionService } from '../../../user/service/session.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {

  private numberAsGender : Map<number, string> = new Map().set(0, "Masculino") 
  .set(1, "Femenino")
  .set(2, "Prefiero no decirlo")
  .set(3, "Otro");


  private user : User;

  constructor(private router: Router,
    private sessionService : SessionService
  ) {
    this.user = sessionService.get();
    console.log(this.user);
  }

  redirectUserEdit() {
      this.router.navigate(['profile-edit']);
  }

  public translateGender(genderAsNumber : number) : string | undefined {
    console.log("NUMBER === " + genderAsNumber);
    return this.numberAsGender.get(genderAsNumber);
  }

  getUser() : User {
    return this.user;
  }

}
