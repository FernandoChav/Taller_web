import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewInteractionComponent } from './user-view-interaction.component';

describe('UserViewInteractionComponent', () => {
  let component: UserViewInteractionComponent;
  let fixture: ComponentFixture<UserViewInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewInteractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
