import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { GamePlanListComponent } from './game-plan-list/game-plan-list.component';
import { GamePlanEditComponent } from './game-plan-edit/game-plan-edit.component';
import { GamePlanPeriodComponent } from './game-plan-period/game-plan-period.component';

@NgModule({
  declarations: [
    GamePlanListComponent,
    GamePlanEditComponent,
    GamePlanPeriodComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    FlexLayoutModule,
    SharedModule
  ],
  exports: [
    GamePlanListComponent
  ]
})
export class GamePlanModule { }
