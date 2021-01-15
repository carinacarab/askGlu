import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabeticregComponent } from './diabeticreg.component';

describe('DiabeticregComponent', () => {
  let component: DiabeticregComponent;
  let fixture: ComponentFixture<DiabeticregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiabeticregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiabeticregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
