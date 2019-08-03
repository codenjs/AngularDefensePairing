import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlanPeriodComponent } from './game-plan-period.component';
import { GamePlanModule } from '../game-plan.module';
import { DepthChartModule } from 'src/app/depth-chart/depth-chart.module';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

describe('GamePlanPeriodComponent', () => {
  let component: GamePlanPeriodComponent;
  let fixture: ComponentFixture<GamePlanPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ GamePlanModule, DepthChartModule ]
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
