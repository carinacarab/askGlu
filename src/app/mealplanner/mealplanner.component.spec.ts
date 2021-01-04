import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplannerComponent } from './mealplanner.component';

describe('MealplannerComponent', () => {
  let component: MealplannerComponent;
  let fixture: ComponentFixture<MealplannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealplannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealplannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
