import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSensorComponent } from './crud-sensor.component';

describe('CrudSensorComponent', () => {
  let component: CrudSensorComponent;
  let fixture: ComponentFixture<CrudSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
