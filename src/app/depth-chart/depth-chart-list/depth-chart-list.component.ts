import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DepthChartListItem } from '../depth-chart-list-item';

@Component({
  selector: 'app-depth-chart-list',
  templateUrl: './depth-chart-list.component.html',
  styleUrls: ['./depth-chart-list.component.css']
})
export class DepthChartListComponent implements OnInit {
  @Input() items: DepthChartListItem[];
  @Input() dragDropDisabled: boolean;
  @Input() emptyMessage: string;
  @Output() reordered = new EventEmitter();
  @Output() deleted = new EventEmitter<number>();
  isDragActive: boolean;
  hoverItemIndex: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.reordered.emit();
  }

  delete(index: number) {
    this.deleted.emit(index);
  }

  isDeleteClickable(currentIndex: number): boolean {
    // Delete is clickable for the item currently being hovered,
    // but not when any item is being dragged or the list is disabled
    return this.hoverItemIndex === currentIndex &&
      !this.isDragActive &&
      !this.dragDropDisabled;
  }
}
