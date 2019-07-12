import { TestBed } from '@angular/core/testing';

import { DepthChartService } from './depth-chart.service';

describe('DepthChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepthChartService = TestBed.get(DepthChartService);
    expect(service).toBeTruthy();
  });
});
