import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsmanagerComponent } from './bsmanager.component';

describe('BsmanagerComponent', () => {
  let component: BsmanagerComponent;
  let fixture: ComponentFixture<BsmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
