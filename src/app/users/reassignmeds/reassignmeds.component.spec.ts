import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignmedsComponent } from './reassignmeds.component';

describe('ReassignmedsComponent', () => {
  let component: ReassignmedsComponent;
  let fixture: ComponentFixture<ReassignmedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReassignmedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignmedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
