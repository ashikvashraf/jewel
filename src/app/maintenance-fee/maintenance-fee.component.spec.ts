import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceFeeComponent } from './maintenance-fee.component';

describe('MaintenanceFeeComponent', () => {
  let component: MaintenanceFeeComponent;
  let fixture: ComponentFixture<MaintenanceFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
