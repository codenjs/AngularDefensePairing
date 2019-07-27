import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DepthChartListComponent } from './depth-chart-list/depth-chart-list.component';
import { DepthChartAddComponent } from './depth-chart-add/depth-chart-add.component';
import { DepthChartClearDialogComponent } from './depth-chart-clear-dialog/depth-chart-clear-dialog.component';
import { DepthChartPlayersComponent } from './depth-chart-players/depth-chart-players.component';
import { DepthChartPairingsComponent } from './depth-chart-pairings/depth-chart-pairings.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    DepthChartListComponent,
    DepthChartAddComponent,
    DepthChartClearDialogComponent,
    DepthChartPlayersComponent,
    DepthChartPairingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule
  ],
  exports: [
    DepthChartPlayersComponent,
    DepthChartPairingsComponent
  ],
  entryComponents: [
    DepthChartClearDialogComponent
  ]
})
export class DepthChartModule { }
