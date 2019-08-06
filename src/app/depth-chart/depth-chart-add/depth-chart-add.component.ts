import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DepthChartService } from '../depth-chart.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-depth-chart-add',
  templateUrl: './depth-chart-add.component.html',
  styleUrls: ['./depth-chart-add.component.css']
})
export class DepthChartAddComponent implements OnInit {

  addForm: FormGroup;
  @ViewChild('newNameInput', {static: false}) newNameElement: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private depthChartService: DepthChartService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      newName: ['', this.duplicateNameValidator()]
    }, {
      updateOn: 'submit'
    });
  }

  // convenience getter for easy access to form field
  get newName() { return this.addForm.get('newName'); }

  duplicateNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const inputName = control.value.trim();
      return this.depthChartService.getPlayers()
        .find(i => i.name === inputName) ? {duplicateName: {value: inputName + ' already exists'}} : null;
    };
  }

  onSubmit(): void {
    if (this.addForm.invalid) {
      return;
    }

    const newName = this.newName.value.trim();

    if (!newName) {
      return;
    }

    this.depthChartService.addPlayer(newName);
    this.newName.setValue('');
    this.newNameElement.nativeElement.focus();
  }

  confirmClear(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'This will remove all players'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.depthChartService.clearAll();
      }
    });
  }
}
