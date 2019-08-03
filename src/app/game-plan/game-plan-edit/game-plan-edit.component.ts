import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { GamePlanService } from '../game-plan.service';
import { DepthChartService } from 'src/app/depth-chart/depth-chart.service';
import { DepthChartListItem } from 'src/app/depth-chart/depth-chart-list-item';
import { UniqueCounter } from '../unique-counter';

@Component({
  selector: 'app-game-plan-edit',
  templateUrl: './game-plan-edit.component.html',
  styleUrls: ['./game-plan-edit.component.css']
})
export class GamePlanEditComponent implements OnInit {
  pairings: DepthChartListItem[];
  pairingCounter = new UniqueCounter<DepthChartListItem, number>();
  gameForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public gamePlanService: GamePlanService,
    private depthChartService: DepthChartService) { }

  ngOnInit() {
    this.pairings = this.depthChartService.getPairings();

    this.pairings.forEach((element, i) => {
      element.value = i;
    });

    this.gameForm = this.formBuilder.group({
      gameDescription: ['']
    }, {
      updateOn: 'submit'
    });
  }

  onPeriodUpdated() {
    this.pairingCounter.setCounts(
      this.gamePlanService.getAllSelectedPairings(),
      p => p.value);
  }

  onSubmit(): void {
    const gameDescription = this.gameForm.get('gameDescription').value;
    this.gamePlanService.addGame(gameDescription);
    this.router.navigate(['']);
  }
}
