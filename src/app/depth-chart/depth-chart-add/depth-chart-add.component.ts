import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { DepthChartService } from '../depth-chart.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { DuplicateItemValidator, ValidatorExtensions } from 'src/app/shared/validators';
import { ListItem } from 'src/app/shared/list-item';

@Component({
  selector: 'app-depth-chart-add',
  templateUrl: './depth-chart-add.component.html',
  styleUrls: ['./depth-chart-add.component.css']
})
export class DepthChartAddComponent implements OnInit {

  addForm: FormGroup;
  @Input() items: ListItem[] = [];
  @ViewChild('newNameInput', {static: false}) newNameElement: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private depthChartService: DepthChartService,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      newName: ['', [
        DuplicateItemValidator.create(() => this.duplicateItemLookup()),
        this.invalidCharacterValidator()
      ]]
    }, {
      updateOn: 'submit'
    });
  }

  // convenience getters for easy access to form field
  get newName() { return this.addForm.get('newName'); }
  get newNameFirstError(): string {
    // Currently, only 1 error can occur at a time
    return ValidatorExtensions.firstError(this.newName.errors);
  }

  duplicateItemLookup(): string[] {
    return this.depthChartService.getPlayers()
      .map(p => p.name);
  }

  invalidCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const regex = new RegExp(/\//);
      const match = regex.test(control.value);
      return match ? {invalidCharacter: {value: 'Invalid character: /'}} : null;
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
    this.confirmDialogService.openDialog('This will remove all players', () => {
      this.depthChartService.clearAll();
    });
  }
}
