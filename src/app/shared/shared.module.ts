import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ListHeaderComponent } from './list-header/list-header.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ListHeaderComponent
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    ConfirmDialogComponent,
    ListHeaderComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
