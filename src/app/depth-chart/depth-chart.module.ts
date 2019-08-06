import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedModule } from '../shared/shared.module';
import { DepthChartListComponent } from './depth-chart-list/depth-chart-list.component';
import { DepthChartAddComponent } from './depth-chart-add/depth-chart-add.component';
import { DepthChartPlayersComponent } from './depth-chart-players/depth-chart-players.component';
import { DepthChartPairingsComponent } from './depth-chart-pairings/depth-chart-pairings.component';

@NgModule({
  declarations: [
    DepthChartListComponent,
    DepthChartAddComponent,
    DepthChartPlayersComponent,
    DepthChartPairingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    SharedModule
  ],
  exports: [
    DepthChartPlayersComponent,
    DepthChartPairingsComponent,
    DepthChartListComponent
  ]
})
export class DepthChartModule { }
