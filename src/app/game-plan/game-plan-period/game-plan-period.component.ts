import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

import { GamePlanService } from '../game-plan.service';
import { DepthChartService } from 'src/app/depth-chart/depth-chart.service';
import { DepthChartListItem } from 'src/app/depth-chart/depth-chart-list-item';

@Component({
  selector: 'app-game-plan-period',
  templateUrl: './game-plan-period.component.html',
  styleUrls: ['./game-plan-period.component.css']
})
export class GamePlanPeriodComponent implements OnInit {
  @Input() period: number;
  players: DepthChartListItem[];
  pairings: DepthChartListItem[];
  playerGroups = {};
  @Output() updated = new EventEmitter();

  constructor(
    private gamePlanService: GamePlanService,
    private depthChartService: DepthChartService) { }

  ngOnInit() {
    this.players = this.depthChartService.getPlayers();
    this.pairings = this.gamePlanService.getSelectedPairings();
  }

  disallowDuplicate(draggedItem: CdkDrag<DepthChartListItem>, targetDropList: CdkDropList<DepthChartListItem[]>) {
    const existingValues = targetDropList.data.map(i => i.value);
    return !existingValues.includes(draggedItem.data.value);
  }

  onDrop(event: CdkDragDrop<DepthChartListItem>) {
    this.pairings.push(event.item.data);
    this.pairings.sort((a, b) => a.value - b.value);
    this.updatePlayerGroups();
    this.updated.emit();
  }

  updatePlayerGroups() {
    const separatePlayerNames = this.splitPairingsIntoPlayerNames();
    this.playerGroups = this.groupPlayersByName(separatePlayerNames);
  }

  splitPairingsIntoPlayerNames(): string[] {
    const allNames = [];
    this.pairings.forEach(p => {
      const pairNames = p.name.split('/');
      allNames.push(pairNames[0]);
      allNames.push(pairNames[1]);
    });
    return allNames;
  }

  groupPlayersByName(players: string[]) {
    return players.reduce((groups, item) => {
      const group = (groups[item] || []);
      group.push(item);
      groups[item] = group;
      return groups;
    }, {});
  }

  playerCount(name: string): number {
    const group = this.playerGroups[name] || [];
    return group.length;
  }
}
