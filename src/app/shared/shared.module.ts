import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    ConfirmDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
