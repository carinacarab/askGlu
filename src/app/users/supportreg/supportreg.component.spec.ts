import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportregComponent } from './supportreg.component';

describe('SupportregComponent', () => {
  let component: SupportregComponent;
  let fixture: ComponentFixture<SupportregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
