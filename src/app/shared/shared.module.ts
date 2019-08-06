import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListItemEmptyComponent } from './list-item-empty/list-item-empty.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ListHeaderComponent,
    ListItemEmptyComponent
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    ConfirmDialogComponent,
    ListHeaderComponent,
    ListItemEmptyComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
