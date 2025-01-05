import { Component } from '@angular/core';
import { UserController } from '../controller/user.controller';
import { NgFor } from '@angular/common';
import { UserService } from '../../service/user.service';
import { HttpHeaderUtil } from '../../../util/http.header.util';
import { ObjectParameters } from '../../../entities/object.parameters';

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

  public constructor(public controller : UserController,
    private userService : UserService
  ) {
  }

  public translateIsActive(isActive : boolean) : string {
    return isActive ? "Sí" : "No";
  }

  public translateGender(genderAsNumber : number) : string | undefined {
      return this.numberAsGender.get(genderAsNumber);
  }

  public getMessageSwitchVisibility(isActive : boolean) {
    return isActive ? "Desactivar" : "Activar";
  }

  public switchVisibility(id : number) {
    var status = false;

    this.controller.group
    ?.entities.forEach(user => {
      if(user.id == id){
        status = !user.isActive;
        user.isActive = status;
      }
    });

    this.userService.update(id, ObjectParameters.newParameters()
    .add("IsActive", status + ""), HttpHeaderUtil.asBearToken("to"))
    .forEach(user => {
        console.log("USER = " + user);
    });
  }

  public translateBirthdate(birthdate : string) : string  {
    return birthdate.split('T')[0];
  }

}
