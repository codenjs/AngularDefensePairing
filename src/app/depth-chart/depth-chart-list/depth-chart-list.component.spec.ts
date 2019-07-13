import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthChartListComponent } from './depth-chart-list.component';
import { DepthChartModule } from '../depth-chart.module';

describe('DepthChartListComponent', () => {
  let component: DepthChartListComponent;
  let fixture: ComponentFixture<DepthChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DepthChartModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
