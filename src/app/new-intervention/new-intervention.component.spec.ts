import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInterventionComponent } from './new-intervention.component';

describe('NewInterventionComponent', () => {
  let component: NewInterventionComponent;
  let fixture: ComponentFixture<NewInterventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInterventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
