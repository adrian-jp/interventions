import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionTableComponent } from './intervention-table.component';

describe('InterventionTableComponent', () => {
  let component: InterventionTableComponent;
  let fixture: ComponentFixture<InterventionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
