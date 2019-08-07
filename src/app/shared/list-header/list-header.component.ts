import { Component, Input } from '@angular/core';
import { ListItem } from '../list-item';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css']
})
export class ListHeaderComponent {
  @Input() items: ListItem[];
  private originalTitle: string;
  private originalInstructions: string;

  @Input()
  set title(input: string) {
    this.originalTitle = input;
  }
  get title(): string {
    return this.items.length === 0
      ? this.originalTitle
      : `${this.originalTitle} (${this.items.length})`;
  }

  @Input()
  set instructions(input: string) {
    this.originalInstructions = input;
  }
  get instructions(): string {
    return this.items.length === 0
      ? ''
      : this.originalInstructions;
  }
}
