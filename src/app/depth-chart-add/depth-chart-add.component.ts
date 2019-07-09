import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-depth-chart-add',
  templateUrl: './depth-chart-add.component.html',
  styleUrls: ['./depth-chart-add.component.css']
})
export class DepthChartAddComponent implements OnInit {

  newName: string;
  @ViewChild('newNameInput', {static: false}) newNameElement: ElementRef;
  @Output() nameSaved = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  save(): void {
    this.nameSaved.emit(this.newName);
    this.newName = '';
    this.newNameElement.nativeElement.focus();
  }
}
