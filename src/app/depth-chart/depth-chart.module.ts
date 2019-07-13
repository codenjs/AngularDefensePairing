import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DepthChartListComponent } from './depth-chart-list/depth-chart-list.component';
import { DepthChartAddComponent } from './depth-chart-add/depth-chart-add.component';

@NgModule({
  declarations: [
    DepthChartListComponent,
    DepthChartAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DepthChartListComponent
  ]
})
export class DepthChartModule { }
