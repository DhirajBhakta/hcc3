import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaRootComponent } from './pharma-root.component';

describe('PharmaRootComponent', () => {
  let component: PharmaRootComponent;
  let fixture: ComponentFixture<PharmaRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
