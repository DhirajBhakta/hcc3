import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRootComponent } from './patient-root.component';

describe('PatientRootComponent', () => {
  let component: PatientRootComponent;
  let fixture: ComponentFixture<PatientRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
