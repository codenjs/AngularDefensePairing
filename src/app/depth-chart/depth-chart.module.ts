import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { DepthChartListComponent } from './depth-chart-list/depth-chart-list.component';
import { DepthChartAddComponent } from './depth-chart-add/depth-chart-add.component';
import { DepthChartClearDialogComponent } from './depth-chart-clear-dialog/depth-chart-clear-dialog.component';
import { DepthChartPlayersComponent } from './depth-chart-players/depth-chart-players.component';
import { DepthChartPairingsComponent } from './depth-chart-pairings/depth-chart-pairings.component';

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
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    DragDropModule
  ],
  exports: [
    DepthChartPlayersComponent,
    DepthChartPairingsComponent,
    DepthChartListComponent
  ],
  entryComponents: [
    DepthChartClearDialogComponent
  ]
})
export class DepthChartModule { }
