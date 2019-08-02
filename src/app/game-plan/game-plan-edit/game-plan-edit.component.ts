import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

import { GamePlanService } from '../game-plan.service';
import { DepthChartService } from 'src/app/depth-chart/depth-chart.service';
import { DepthChartListItem } from 'src/app/depth-chart/depth-chart-list-item';

@Component({
  selector: 'app-game-plan-edit',
  templateUrl: './game-plan-edit.component.html',
  styleUrls: ['./game-plan-edit.component.css']
})
export class GamePlanEditComponent implements OnInit {
  players: DepthChartListItem[];
  pairings: DepthChartListItem[];
  pairingGroups = {};
  period1: DepthChartListItem[] = [];
  gameForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private gamePlanService: GamePlanService,
    private depthChartService: DepthChartService) { }

  ngOnInit() {
    this.players = this.depthChartService.getPlayers();
    this.pairings = this.depthChartService.getPairings();

    this.players.forEach((element) => {
      element.value = 0;
    });

    this.pairings.forEach((element, i) => {
      element.value = i;
    });

    this.gameForm = this.formBuilder.group({
      gameDescription: ['']
    }, {
      updateOn: 'submit'
    });
  }

  disallowDuplicate(draggedItem: CdkDrag<DepthChartListItem>, targetDropList: CdkDropList<DepthChartListItem[]>) {
    const existingValues = targetDropList.data.map(i => i.value);
    return !existingValues.includes(draggedItem.data.value);
  }

  onDrop(event: CdkDragDrop<DepthChartListItem>) {
    const names = event.item.data.name.split('/');
    this.incrementPlayer(names[0]);
    this.incrementPlayer(names[1]);
    this.updateTargetList(event.previousIndex);
    this.countPairs();
  }

  incrementPlayer(name: string) {
    const player = this.players.filter(p => p.name === name)[0];
    player.value++;
  }

  updateTargetList(draggedIndex: number) {
    this.period1.push(this.pairings[draggedIndex]);
    this.period1.sort((a, b) => a.value - b.value);
  }

  countPairs() {
    this.pairingGroups = this.period1.reduce((groups, item) => {
      const group = (groups[item.value] || []);
      group.push(item);
      groups[item.value] = group;
      return groups;
    }, {});
  }

  pairCount(index: number): number {
    const group = this.pairingGroups[index] || [];
    return group.length;
  }

  onSubmit(): void {
    const gameDescription = this.gameForm.get('gameDescription').value;
    this.gamePlanService.addGame(gameDescription);
    this.router.navigate(['']);
  }
}
