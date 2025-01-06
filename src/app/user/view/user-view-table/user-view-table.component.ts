import { Component } from '@angular/core';
import { UserController } from '../controller/user.controller';
import { NgFor } from '@angular/common';
import { UserService } from '../../service/user.service';
import { HttpHeaderUtil } from '../../../util/http.header.util';
import { ObjectParameters } from '../../../entities/object.parameters';

/**
 * This component represent a table that contains data for user 
 */

@Component({
  selector: 'app-user-view-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-view-table.component.html',
  styleUrl: './user-view-table.component.css'
})
export class UserViewTableComponent {

  /**
   * This a map that contains as key a number product type and value the name product type
   * Is used for make transformation between values 
   */

  private numberAsGender : Map<number, string> = new Map().set(0, "Masculino") 
  .set(1, "Femenino")
  .set(2, "Prefiero no decirlo")
  .set(3, "Otro");

  /**
   * The main constructor, used for inject dependencies
   * @param controller a controller-service for share depenendecies
   * @param userService a user service 
   */

  public constructor(public controller : UserController,
    private userService : UserService
  ) {
  }

  /**
   * Transform a boolean in a string using the next criteria
   * 
   * The boolean si true = 'Sí'
   * The boolean is false = 'No'
   * 
   * @param isActive 
   * @returns a string using  the criteria above
   */

  public translateIsActive(isActive : boolean) : string {
    return isActive ? "Sí" : "No";
  }

  /**
   * Translate a gender as number to string using the map mentionaed above
   * @param genderAsNumber 
   * @returns a product type
   */

  public translateGender(genderAsNumber : number) : string | undefined {
      return this.numberAsGender.get(genderAsNumber);
  }

  /**
   * Transform a boolean in a string using the next criteria
   * 
   * The boolean si true = 'Desactivar'
   * The boolean is false = 'Activar'
   * 
   * @param isActive 
   * @returns a string using  the criteria above
   */


  public getMessageSwitchVisibility(isActive : boolean) {
    return isActive ? "Desactivar" : "Activar";
  }

  /**
   * Switch between visibility  
   * @param id  the id user for update the visibility
   */

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
    .add("IsActive", status + ""))
    .forEach(user => {
        console.log("USER = " + user);
    });
  }

  /**
   * Convert a date in a short format
   * @param birthdate the date for convert
   * @returns the date with a short format
   */

  public translateBirthdate(birthdate : string) : string  {
    return birthdate.split('T')[0];
  }

}
