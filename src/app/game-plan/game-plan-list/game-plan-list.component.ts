import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DepthChartListItem } from 'src/app/depth-chart/depth-chart-list-item';
import { GamePlanService } from '../game-plan.service';

@Component({
  selector: 'app-game-plan-list',
  templateUrl: './game-plan-list.component.html',
  styleUrls: ['./game-plan-list.component.css']
})
export class GamePlanListComponent implements OnInit {
  items: DepthChartListItem[];

  constructor(
    private router: Router,
    private gamePlanService: GamePlanService) { }

  ngOnInit() {
    this.items = this.gamePlanService.getGamePlanList();
  }

  onClick(index: number) {
    this.router.navigate(['game', index]);
  }
}
