import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaComponent } from './pharma.component';

describe('PharmaComponent', () => {
  let component: PharmaComponent;
  let fixture: ComponentFixture<PharmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
