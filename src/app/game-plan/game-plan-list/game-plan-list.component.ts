import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GamePlanService } from '../game-plan.service';
import { ListItem } from 'src/app/shared/list-item';

@Component({
  selector: 'app-game-plan-list',
  templateUrl: './game-plan-list.component.html',
  styleUrls: ['./game-plan-list.component.css']
})
export class GamePlanListComponent implements OnInit {
  items: ListItem[];

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
