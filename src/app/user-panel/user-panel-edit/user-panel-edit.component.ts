import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../Authentication/Components/navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../user/interface/user';
import { SessionService } from '../../user/service/session.service';
import { CommonModule } from '@angular/common';

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

  private numberAsGender : Map<number, string> = new Map().set(0, "Masculino") 
  .set(1, "Femenino")
  .set(2, "Prefiero no decirlo")
  .set(3, "Otro");

  forms!: FormGroup;
  user : User;
  
  constructor(private router: Router,
    private formBuilder : FormBuilder,
    private sessionService : SessionService
  ) {
    this.user = sessionService.get();
  }

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

  getRut() {
    return this.forms.get('rut');
  }

  getId() {
    return this.forms.get('id');
  }

  getIsActive() {
    return this.forms.get('isActive');
  }

  getName()  {
    return this.forms.get('name');
  }

  getBirthdate()  {
    return this.forms.get('birthdate');
  }

  getGender()  {
    return this.forms.get('gender');
  }

  back() {
    this.router.navigate(['/profile']);
  }

  public translateGender(genderAsNumber : number) : string | undefined {
    console.log("NUMBER === " + genderAsNumber);
    return this.numberAsGender.get(genderAsNumber);
  }

  onSubmit() {

  }

}
