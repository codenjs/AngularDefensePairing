import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { GamePlanPeriodComponent } from './game-plan-period.component';

describe('GamePlanPeriodComponent', () => {
  let component: GamePlanPeriodComponent;
  let fixture: ComponentFixture<GamePlanPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlanPeriodComponent ],
      imports: [ DragDropModule ]
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
