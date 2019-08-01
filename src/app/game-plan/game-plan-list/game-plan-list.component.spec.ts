import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GamePlanListComponent } from './game-plan-list.component';
import { DepthChartModule } from 'src/app/depth-chart/depth-chart.module';

describe('GamePlanListComponent', () => {
  let component: GamePlanListComponent;
  let fixture: ComponentFixture<GamePlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlanListComponent ],
      imports: [
        RouterTestingModule,
        DepthChartModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
