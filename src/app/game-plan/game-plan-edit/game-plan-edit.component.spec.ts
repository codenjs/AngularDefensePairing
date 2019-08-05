import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { GamePlanEditComponent } from './game-plan-edit.component';
import { GamePlanModule } from '../game-plan.module';
import { GamePlanService } from '../game-plan.service';
import { GamePlan } from '../game-plan';
import { DepthChartModule } from 'src/app/depth-chart/depth-chart.module';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

describe('GamePlanEditComponent', () => {
  let component: GamePlanEditComponent;
  let fixture: ComponentFixture<GamePlanEditComponent>;

  beforeEach(async(() => {
    const stubGamePlanService = {
      currentGame: new GamePlan(),
      loadGamePlan: () => {},
      getAllSelectedPairings: () => []
    };

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        GamePlanModule,
        DepthChartModule
      ],
      providers: [ { provide: GamePlanService, useValue: stubGamePlanService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
