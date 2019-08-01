import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from '../app-routing.module';
import { DepthChartModule } from '../depth-chart/depth-chart.module';
import { GamePlanListComponent } from './game-plan-list/game-plan-list.component';
import { GamePlanEditComponent } from './game-plan-edit/game-plan-edit.component';

@NgModule({
  declarations: [
    GamePlanListComponent,
    GamePlanEditComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    DepthChartModule
  ],
  exports: [
    GamePlanListComponent
  ]
})
export class GamePlanModule { }
