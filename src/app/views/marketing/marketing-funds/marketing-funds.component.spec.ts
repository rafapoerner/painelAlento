import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingFundsComponent } from './marketing-funds.component';

describe('MarketingFundsComponent', () => {
  let component: MarketingFundsComponent;
  let fixture: ComponentFixture<MarketingFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingFundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketingFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
