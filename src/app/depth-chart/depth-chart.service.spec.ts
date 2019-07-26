import { TestBed } from '@angular/core/testing';

import { DepthChartService } from './depth-chart.service';
import { DepthChartListItem } from './depth-chart-list-item';

describe('DepthChartService generatePairings', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  const generateAndAssert = (input: DepthChartListItem[], expectedOutput: DepthChartListItem[]) => {
    const service: DepthChartService = TestBed.get(DepthChartService);
    service.players = input;
    service.generatePairings();
    expect(service.pairings).toEqual(expectedOutput);
  };

  it('should generate no pairings when input is empty', () => {
    generateAndAssert([], []);
  });

  it('should generate no pairings when input contains 1 name', () => {
    generateAndAssert([{ name: 'name1' }], []);
  });

  it('should generate 1 pairing when input contains 2 names', () => {
    generateAndAssert([
      { name: 'name1' },
      { name: 'name2' }
    ],
    [
      { name: 'name1/name2' }
    ]);
  });

  it('should generate 3 pairings when input contains 3 names', () => {
    generateAndAssert([
      { name: 'name1' },
      { name: 'name2' },
      { name: 'name3' }
    ],
    [
      { name: 'name1/name2' },
      { name: 'name1/name3' },
      { name: 'name2/name3'}
    ]);
  });

  it('should generate 6 pairings when input contains 4 names', () => {
    generateAndAssert([
      { name: 'name1' },
      { name: 'name2' },
      { name: 'name3' },
      { name: 'name4' }
    ],
    [
      { name: 'name1/name2' },
      { name: 'name1/name3' },
      { name: 'name1/name4' },
      { name: 'name2/name3' },
      { name: 'name2/name4' },
      { name: 'name3/name4'}
    ]);
  });
});
