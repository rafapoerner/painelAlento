import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBiViewComponent } from './powerbi-view.component';

describe('PowerBiViewComponent', () => {
  let component: PowerBiViewComponent;
  let fixture: ComponentFixture<PowerBiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerBiViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PowerBiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
