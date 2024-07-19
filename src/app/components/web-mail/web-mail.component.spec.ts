import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebMailComponent } from './web-mail.component';

describe('WebMailComponent', () => {
  let component: WebMailComponent;
  let fixture: ComponentFixture<WebMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebMailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
