import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuboardPostsComponent } from './menuboard-posts.component';

describe('MenuboardPostsComponent', () => {
  let component: MenuboardPostsComponent;
  let fixture: ComponentFixture<MenuboardPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuboardPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuboardPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
