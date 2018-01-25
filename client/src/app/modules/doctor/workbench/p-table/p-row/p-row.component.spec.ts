import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PRowComponent } from './p-row.component';

describe('PRowComponent', () => {
  let component: PRowComponent;
  let fixture: ComponentFixture<PRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
