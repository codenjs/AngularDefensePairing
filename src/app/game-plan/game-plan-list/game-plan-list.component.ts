import { Component, OnInit } from '@angular/core';
import { DepthChartListItem } from 'src/app/depth-chart/depth-chart-list-item';
import { GamePlanService } from '../game-plan.service';

@Component({
  selector: 'app-game-plan-list',
  templateUrl: './game-plan-list.component.html',
  styleUrls: ['./game-plan-list.component.css']
})
export class GamePlanListComponent implements OnInit {
  items: DepthChartListItem[];

  constructor(private gamePlanService: GamePlanService) {
    this.items = this.gamePlanService.getGames();
  }

  ngOnInit() {
  }

}
