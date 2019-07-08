import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-depth-chart-add',
  templateUrl: './depth-chart-add.component.html',
  styleUrls: ['./depth-chart-add.component.css']
})
export class DepthChartAddComponent implements OnInit {

  newName: string;
  @Output() nameSaved = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  save(): void {
    this.nameSaved.emit(this.newName);
  }
}
