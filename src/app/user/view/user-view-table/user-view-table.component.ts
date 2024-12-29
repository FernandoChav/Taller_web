import { Component } from '@angular/core';
import { UserController } from '../controller/user.controller';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-view-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-view-table.component.html',
  styleUrl: './user-view-table.component.css'
})
export class UserViewTableComponent {

  private numberAsGender : Map<number, string> = new Map().set(0, "Masculino") 
  .set(1, "Femenino")
  .set(2, "Prefiero no decirlo")
  .set(3, "Otro");

  public constructor(public controller : UserController) {
  }

  public translateIsActive(isActive : boolean) : string {
    return isActive ? "Sí" : "No";
  }

  public translateGender(genderAsNumber : number) : string | undefined {
      return this.numberAsGender.get(genderAsNumber);
  }

  public getMessageSwitchVisibility(isActive : boolean) {
    return isActive ? "Desactivar " : "Activar";
  }

  public switchVisibility(id : number) {
    var status = false;

    this.controller.group
    ?.entities.forEach(user => {
      if(user.id == id){
        console.log("UPDATING");
        status = !user.isActive;
        user.isActive = status;
      }
    });
  }

}
