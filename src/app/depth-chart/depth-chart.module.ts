import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ],
  exports: [
    DepthChartPlayersComponent,
    DepthChartPairingsComponent
  ]
})
export class DepthChartModule { }
