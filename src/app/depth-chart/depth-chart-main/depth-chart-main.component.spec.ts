import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthChartMainComponent } from './depth-chart-main.component';
import { DepthChartModule } from '../depth-chart.module';

describe('DepthChartMainComponent', () => {
  let component: DepthChartMainComponent;
  let fixture: ComponentFixture<DepthChartMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DepthChartModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthChartMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
