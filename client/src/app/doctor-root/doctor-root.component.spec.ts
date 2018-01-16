import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRootComponent } from './doctor-root.component';

describe('DoctorRootComponent', () => {
  let component: DoctorRootComponent;
  let fixture: ComponentFixture<DoctorRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
