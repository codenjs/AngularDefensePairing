import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { DepthChartService } from '../depth-chart.service';

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
    private depthChartService: DepthChartService) { }

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
      return this.depthChartService.getPlayers()
        .find(i => i.name === control.value.trim()) ? {duplicateName: {value: control.value + ' already exists'}} : null;
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
}
