import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GamePlanService } from '../game-plan.service';
import { DepthChartService } from 'src/app/depth-chart/depth-chart.service';
import { ListItem } from 'src/app/shared/list-item';
import { UniqueCounter } from 'src/app/shared/unique-counter';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { DuplicateItemValidator } from 'src/app/shared/validators/duplicate-item-validator';

@Component({
  selector: 'app-game-plan-edit',
  templateUrl: './game-plan-edit.component.html',
  styleUrls: ['./game-plan-edit.component.css']
})
export class GamePlanEditComponent implements OnInit {
  id: number;
  pairings: ListItem[];
  pairingCounter = new UniqueCounter<ListItem, number>();
  gameForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmDialogService: ConfirmDialogService,
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
      gameDescription: [this.gamePlanService.currentGame.description, [
        Validators.required,
        DuplicateItemValidator.create(() => this.duplicateItemLookup())
      ]]
    }, {
      updateOn: 'submit'
    });
  }

  // convenience getters for easy access to form field
  get gameDescription() {
    return this.gameForm.get('gameDescription'); }
  get gameDescriptionFirstError(): string {
    // Currently, only 1 error can occur at a time
    const keys = Object.keys(this.gameDescription.errors);
    if (keys[0] === 'required') {
      return 'Description is required';
    } else {
      return this.gameDescription.errors[keys[0]].value;
    }
  }

  duplicateItemLookup(): string[] {
    return this.gamePlanService.games
      .filter((_, i) => i !== this.id)
      .map(g => g.description);
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
    if (this.gameForm.invalid) {
      return;
    }

    this.gamePlanService.currentGame.description = this.gameForm.get('gameDescription').value;
    this.gamePlanService.saveGamePlan(this.id);
    this.router.navigate(['']);
  }

  confirmDelete(): void {
    this.confirmDialogService.openDialog('This will delete the game plan', () => {
      this.gamePlanService.deleteGamePlan(this.id);
      this.router.navigate(['']);
    });
  }
}
