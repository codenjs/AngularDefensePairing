import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DepthChartService } from './depth-chart.service';
import { ListItem } from '../shared/list-item';

const configureTestingModule = () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });
};

describe('DepthChartService updatePairings', () => {
  configureTestingModule();

  const generateAndAssert = (input: ListItem[], expectedOutput: ListItem[]) => {
    const service: DepthChartService = TestBed.get(DepthChartService);
    service.players = input;
    service.updatePairings();
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

describe('DepthChartService clearAll', () => {
  configureTestingModule();

  it('should remove all players and pairings', () => {
    const service: DepthChartService = TestBed.get(DepthChartService);
    service.players = [{ name: 'name1' }, { name: 'name2' }];
    service.updatePairings();

    expect(service.players.length).toEqual(2);
    expect(service.pairings.length).toEqual(1);

    service.clearAll();
    expect(service.players.length).toEqual(0);
    expect(service.pairings.length).toEqual(0);
  });
});

describe('DepthChartService movePlayer', () => {
  configureTestingModule();

  it('should switch source item with destination item', () => {
    const service: DepthChartService = TestBed.get(DepthChartService);
    service.players = [{ name: 'name1' }, { name: 'name2' }];
    service.updatePairings();

    expect(service.players.length).toEqual(2);
    expect(service.pairings.length).toEqual(1);

    service.movePlayer({sourceIndex: 0, destinationIndex: 1});

    expect(service.players).toEqual([{name: 'name2'}, {name: 'name1'}]);
    expect(service.pairings).toEqual([{name: 'name2/name1'}]);
  });
});

describe('DepthChartService deletePlayer', () => {
  configureTestingModule();

  it('should remove the player at specified index', () => {
    const service: DepthChartService = TestBed.get(DepthChartService);
    service.players = [{ name: 'name1' }, { name: 'name2' }, {name: 'name3'}];
    service.updatePairings();

    expect(service.players.length).toEqual(3);
    expect(service.pairings.length).toEqual(3);

    service.deletePlayer(1);

    expect(service.players).toEqual([{name: 'name1'}, {name: 'name3'}]);
    expect(service.pairings).toEqual([{name: 'name1/name3'}]);
  });
});
