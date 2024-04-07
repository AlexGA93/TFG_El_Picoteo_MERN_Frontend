import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortFilterTableComponent } from './sort-filter-table.component';

describe('SortFilterTableComponent', () => {
  let component: SortFilterTableComponent;
  let fixture: ComponentFixture<SortFilterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortFilterTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortFilterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
