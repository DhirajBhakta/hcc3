import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDrugComponent } from './add-new-drug.component';

describe('AddNewDrugComponent', () => {
  let component: AddNewDrugComponent;
  let fixture: ComponentFixture<AddNewDrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
