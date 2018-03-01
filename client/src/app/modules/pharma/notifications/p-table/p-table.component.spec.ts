import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PTableComponent } from './p-table.component';

describe('PTableComponent', () => {
  let component: PTableComponent;
  let fixture: ComponentFixture<PTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
