import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagonsisComponent } from './diagonsis.component';

describe('DiagonsisComponent', () => {
  let component: DiagonsisComponent;
  let fixture: ComponentFixture<DiagonsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagonsisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagonsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
