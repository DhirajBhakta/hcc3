import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtechComponent } from './labtech.component';

describe('LabtechComponent', () => {
  let component: LabtechComponent;
  let fixture: ComponentFixture<LabtechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabtechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
