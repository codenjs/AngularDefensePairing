import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

import { GamePlanService } from '../game-plan.service';
import { DepthChartService } from 'src/app/depth-chart/depth-chart.service';
import { DepthChartListItem } from 'src/app/depth-chart/depth-chart-list-item';
import { UniqueCounter } from 'src/app/shared/unique-counter';

@Component({
  selector: 'app-game-plan-period',
  templateUrl: './game-plan-period.component.html',
  styleUrls: ['./game-plan-period.component.css']
})
export class GamePlanPeriodComponent implements OnInit {
  @Input() period: number;
  players: DepthChartListItem[];
  pairings: DepthChartListItem[];
  playerCounter = new UniqueCounter<string, string>();
  @Output() updated = new EventEmitter();

  constructor(
    private gamePlanService: GamePlanService,
    private depthChartService: DepthChartService) { }

  ngOnInit() {
    this.players = this.depthChartService.getPlayers();
    this.pairings = this.gamePlanService.getSelectedPairingsByPeriod(this.period);
  }

  disallowDuplicate(draggedItem: CdkDrag<DepthChartListItem>, targetDropList: CdkDropList<DepthChartListItem[]>) {
    const existingValues = targetDropList.data.map(i => i.value);
    return !existingValues.includes(draggedItem.data.value);
  }

  onDrop(event: CdkDragDrop<DepthChartListItem>) {
    this.gamePlanService.addPairing(this.period, event.item.data);
    this.updatePlayerCounts();
    this.updated.emit();
  }

  onDelete(pairingValue: number) {
    this.gamePlanService.deletePairing(this.period, pairingValue);
    this.updatePlayerCounts();
    this.updated.emit();
  }

  updatePlayerCounts() {
    const allPlayerNames = this.splitPairingsIntoPlayerNames();
    this.playerCounter.setCounts(allPlayerNames, n => n);
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
}
