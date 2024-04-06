import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedFilteredTableComponent } from './sorted-filtered-table.component';

describe('SortedFilteredTableComponent', () => {
  let component: SortedFilteredTableComponent;
  let fixture: ComponentFixture<SortedFilteredTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortedFilteredTableComponent]
    });
    fixture = TestBed.createComponent(SortedFilteredTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
