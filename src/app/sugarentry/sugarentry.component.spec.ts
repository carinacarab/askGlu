import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugarentryComponent } from './sugarentry.component';

describe('SugarentryComponent', () => {
  let component: SugarentryComponent;
  let fixture: ComponentFixture<SugarentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugarentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugarentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
