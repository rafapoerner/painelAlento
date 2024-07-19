import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegustOneComponent } from './degust-one.component';

describe('DegustOneComponent', () => {
  let component: DegustOneComponent;
  let fixture: ComponentFixture<DegustOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegustOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DegustOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
