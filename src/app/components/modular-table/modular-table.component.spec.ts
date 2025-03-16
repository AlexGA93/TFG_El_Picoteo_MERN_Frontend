import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularTableComponent } from './modular-table.component';

describe('ModularTableComponent', () => {
  let component: ModularTableComponent;
  let fixture: ComponentFixture<ModularTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModularTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModularTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
