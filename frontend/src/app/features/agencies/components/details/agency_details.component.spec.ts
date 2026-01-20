import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Agency_detailsComponent } from './agency_details.component';

describe('Agencies', () => {
  let component: Agency_detailsComponent;
  let fixture: ComponentFixture<Agency_detailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agency_detailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Agency_detailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
