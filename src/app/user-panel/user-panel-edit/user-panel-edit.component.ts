import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../Authentication/Components/navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../user/interface/user';
import { SessionService } from '../../user/service/session.service';
import { CommonModule } from '@angular/common';

/**
 * This component contains a form for edit 
 * settings user 
 */

@Component({
  selector: 'app-user-panel-edit',
  standalone: true,
  imports: [NavbarComponent,
    FooterComponent,CommonModule,
          FormsModule,
          ReactiveFormsModule
  ],
  templateUrl: './user-panel-edit.component.html',
  styleUrl: './user-panel-edit.component.css'
})
export class UserPanelEditComponent implements OnInit {

  /**
   * This is a map that contains key for convert a number to type product
   */

  private numberAsGender : Map<number, string> = new Map().set(0, "Masculino") 
  .set(1, "Femenino")
  .set(2, "Prefiero no decirlo")
  .set(3, "Otro");

  forms!: FormGroup;
  user : User;
  
  /**
   * The main constructor, used for inject a set dependencies
   * @param router the router navigator 
   * @param formBuilder a form builder for create the form
   * @param sessionService a session service for control the user sesion
   */

  constructor(private router: Router,
    private formBuilder : FormBuilder,
    private sessionService : SessionService
  ) {
    this.user = sessionService.get();
  }

  /**
   * Here is assigned the basic components for show in the form
   */

  ngOnInit(): void {
    this.createForm();

    this.forms.patchValue({
      rut : this.user.rut,
      name : this.user.name,
      birthdate : this.user.birthdate,
      gender : this.translateGender(this.user.genderType),
      id : this.user.id
    });

    this.getId()?.disable();
    this.getIsActive()?.disable();
    this.getRut()?.disable();
  }


  /**
   * This method perm load the form 
   */

  createForm() {
    this.forms = this.formBuilder.group({
      rut : ['', []],
      name : ['', []],
      birthdate : ['', []],
      gender : ['', []],
      id : ['', []],
      isActive : ['', []]
    });
  }

  /**
   * Retrieve the rut
   * @returns  the rut field
   */

  getRut() {
    return this.forms.get('rut');
  }

  /**
   * Retrieve the id
   * @returns the id field
   */

  getId() {
    return this.forms.get('id');
  }

  /**
   * Retrieve is active 
   * @returns  the is active field
   */

  getIsActive() {
    return this.forms.get('isActive');
  }

  /**
   * Retrieve the name field
   * @returns the name field
   */

  getName()  {
    return this.forms.get('name');
  }

  /**
   * Retrieve the birthdate field
   * @returns the birthdate field
   */

  getBirthdate()  {
    return this.forms.get('birthdate');
  }

  /**
   * Retrieve the gender field
   * @returns the gender field
   */

  getGender()  {
    return this.forms.get('gender');
  }

  /**
   * Retry to page back, the profile section
   */

  back() {
    this.router.navigate(['/profile']);
  }

  /**
   * Translate a gender number as string, this method use the map mentioned above 
   * @param genderAsNumber 
   * @returns 
   */

  public translateGender(genderAsNumber : number) : string | undefined {
    return this.numberAsGender.get(genderAsNumber);
  }

  onSubmit() {

  }

}
