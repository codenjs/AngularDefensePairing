import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthChartPlayersComponent } from './depth-chart-players.component';
import { DepthChartModule } from '../depth-chart.module';

describe('DepthChartPlayersComponent', () => {
  let component: DepthChartPlayersComponent;
  let fixture: ComponentFixture<DepthChartPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DepthChartModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthChartPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
