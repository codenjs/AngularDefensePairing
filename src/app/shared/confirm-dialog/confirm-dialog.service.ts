import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) { }

  openDialog(message: string, onConfirm: () => void): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: message,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        onConfirm();
      }
    });
  }
}
