import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyPannelComponent } from './money-pannel.component';

describe('MoneyPannelComponent', () => {
  let component: MoneyPannelComponent;
  let fixture: ComponentFixture<MoneyPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyPannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoneyPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
