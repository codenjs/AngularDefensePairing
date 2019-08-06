import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { GamePlanService } from '../game-plan.service';
import { DepthChartService } from 'src/app/depth-chart/depth-chart.service';
import { DepthChartListItem } from 'src/app/depth-chart/depth-chart-list-item';
import { UniqueCounter } from 'src/app/shared/unique-counter';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-game-plan-edit',
  templateUrl: './game-plan-edit.component.html',
  styleUrls: ['./game-plan-edit.component.css']
})
export class GamePlanEditComponent implements OnInit {
  id: number;
  pairings: DepthChartListItem[];
  pairingCounter = new UniqueCounter<DepthChartListItem, number>();
  gameForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public gamePlanService: GamePlanService,
    private depthChartService: DepthChartService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loadGamePlanData();
    this.initializeForm();
  }

  isEditMode() {
    return this.id > -1;
  }

  loadGamePlanData() {
    this.gamePlanService.loadGamePlan(this.id);

    if (this.isEditMode()) {
      this.updatePairingCounts();
    }
  }

  initializeForm() {
    this.pairings = this.depthChartService.getPairings();

    this.pairings.forEach((element, i) => {
      element.value = i;
    });

    this.gameForm = this.formBuilder.group({
      gameDescription: [this.gamePlanService.currentGame.description]
    }, {
      updateOn: 'submit'
    });
  }

  updatePairingCounts() {
    this.pairingCounter.setCounts(
      this.gamePlanService.getAllSelectedPairings(),
      p => p.value);
  }

  onPeriodUpdated() {
    this.updatePairingCounts();
  }

  onSubmit(): void {
    this.gamePlanService.currentGame.description = this.gameForm.get('gameDescription').value;
    this.gamePlanService.saveGamePlan(this.id);
    this.router.navigate(['']);
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'This will delete the game plan'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gamePlanService.deleteGamePlan(this.id);
        this.router.navigate(['']);
      }
    });
  }
}
