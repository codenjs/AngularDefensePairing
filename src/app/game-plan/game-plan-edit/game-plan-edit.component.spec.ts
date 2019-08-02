import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { GamePlanEditComponent } from './game-plan-edit.component';

describe('GamePlanEditComponent', () => {
  let component: GamePlanEditComponent;
  let fixture: ComponentFixture<GamePlanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlanEditComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        DragDropModule
      ]
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
