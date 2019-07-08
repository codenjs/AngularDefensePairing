import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthChartAddComponent } from './depth-chart-add.component';

describe('DepthChartAddComponent', () => {
  let component: DepthChartAddComponent;
  let fixture: ComponentFixture<DepthChartAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepthChartAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthChartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
