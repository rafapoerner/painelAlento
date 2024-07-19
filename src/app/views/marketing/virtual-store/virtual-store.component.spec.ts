import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualStoreComponent } from './virtual-store.component';

describe('VirtualStoreComponent', () => {
  let component: VirtualStoreComponent;
  let fixture: ComponentFixture<VirtualStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirtualStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
