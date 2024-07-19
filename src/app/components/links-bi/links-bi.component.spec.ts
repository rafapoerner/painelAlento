import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksBIComponent } from './links-bi.component';

describe('LinksBIComponent', () => {
  let component: LinksBIComponent;
  let fixture: ComponentFixture<LinksBIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksBIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinksBIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
