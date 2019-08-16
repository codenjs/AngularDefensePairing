import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DepthChartPairingsComponent } from './depth-chart-pairings.component';
import { DepthChartModule } from '../depth-chart.module';

describe('DepthChartPairingsComponent', () => {
  let component: DepthChartPairingsComponent;
  let fixture: ComponentFixture<DepthChartPairingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, DepthChartModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthChartPairingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
