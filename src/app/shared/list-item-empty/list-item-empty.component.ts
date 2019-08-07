import { Component, Input } from '@angular/core';
import { ListItem } from '../list-item';

@Component({
  selector: 'app-list-item-empty',
  templateUrl: './list-item-empty.component.html',
  styleUrls: ['./list-item-empty.component.css']
})
export class ListItemEmptyComponent {
  @Input() items: ListItem[];
  @Input() message: string;
}
