import { Component, OnInit } from '@angular/core';
import { DepthChartListItem } from '../depth-chart-list-item';

@Component({
  selector: 'app-depth-chart-list',
  templateUrl: './depth-chart-list.component.html',
  styleUrls: ['./depth-chart-list.component.css']
})
export class DepthChartListComponent implements OnInit {
  items: DepthChartListItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      { name: 'Claude' },
      { name: 'John' },
      { name: 'Jake' },
      { name: 'Deckard' },
      { name: 'Logan' },
      { name: 'Braeden' }
    ]
  }

  onNameSaved(newName: string) {
    this.items.push({ name: newName });
  }

}
