import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlanPeriodComponent } from './game-plan-period.component';
import { GamePlanModule } from '../game-plan.module';
import { GamePlanService } from '../game-plan.service';
import { GamePlan } from '../game-plan';
import { DepthChartModule } from 'src/app/depth-chart/depth-chart.module';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

describe('GamePlanPeriodComponent', () => {
  let component: GamePlanPeriodComponent;
  let fixture: ComponentFixture<GamePlanPeriodComponent>;

  beforeEach(async(() => {
    const stubGamePlanService = {
      currentGame: new GamePlan(),
      getSelectedPairingsByPeriod: () => []
    };

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ GamePlanModule, DepthChartModule ],
      providers: [ { provide: GamePlanService, useValue: stubGamePlanService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlanPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
