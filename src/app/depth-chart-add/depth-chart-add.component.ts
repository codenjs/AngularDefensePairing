import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { DepthChartListItem } from '../depth-chart-list-item';

@Component({
  selector: 'app-depth-chart-add',
  templateUrl: './depth-chart-add.component.html',
  styleUrls: ['./depth-chart-add.component.css']
})
export class DepthChartAddComponent implements OnInit {

  addForm: FormGroup;
  @ViewChild('newNameInput', {static: false}) newNameElement: ElementRef;
  @Input() items: DepthChartListItem[];
  @Output() nameSaved = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

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
      return this.items.find(i => i.name == control.value.trim()) ? {'duplicateName': {value: control.value + ' already exists'}} : null;
    };
  }

  onSubmit(): void {
    if (this.addForm.invalid) {
      return;
    }

    let newName = this.newName.value.trim();

    if (!newName) {
      return;
    }

    this.nameSaved.emit(newName);
    this.newName.setValue('');
    this.newNameElement.nativeElement.focus();
  }
}
