import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GamePlanService } from '../game-plan.service';
import { DepthChartService } from 'src/app/depth-chart/depth-chart.service';
import { ListItem } from 'src/app/shared/list-item';
import { ArrayUtils } from 'src/app/shared/array-utils';
import { UniqueCounter } from 'src/app/shared/unique-counter';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { DuplicateItemValidator, ValidatorExtensions, WhitespaceValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-game-plan-edit',
  templateUrl: './game-plan-edit.component.html',
  styleUrls: ['./game-plan-edit.component.css']
})
export class GamePlanEditComponent implements OnInit {
  id: number;
  isEditMode: boolean;
  displayWarning: boolean;
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
    this.isEditMode = this.id > -1;
    this.initializePairings();
    this.initializeForm();
  }

  initializePairings() {
    this.gamePlanService.loadGamePlan(this.id);
    const currentDepthChartPlayers = this.depthChartService.getPlayers();

    if (this.isEditMode) {
      this.displayWarning = !ArrayUtils.arraysEqual(this.players, currentDepthChartPlayers,
        (item: ListItem) => item.name);
      this.updatePairingCounts();
    } else {
      this.gamePlanService.currentGame.players = currentDepthChartPlayers;
    }

    this.pairings = this.depthChartService.generatePairings(this.players);
    this.pairings.forEach((element, i) => {
      element.value = i;
    });
  }

  initializeForm() {
    this.gameForm = this.formBuilder.group({
      gameDescription: [this.gamePlanService.currentGame.description, [
        ValidatorExtensions.addCustomMessage(Validators.required, 'Description is required'),
        WhitespaceValidator.create('Description is empty'),
        DuplicateItemValidator.create(() => this.duplicateItemLookup())
      ]]
    }, {
      updateOn: 'submit'
    });
  }

  get players(): ListItem[] { return this.gamePlanService.currentGame.players; }

  // convenience getters for easy access to form field
  get gameDescription() { return this.gameForm.get('gameDescription'); }
  get gameDescriptionFirstError(): string {
    // Currently, only 1 error can occur at a time
    return ValidatorExtensions.firstError(this.gameDescription.errors);
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

    this.gamePlanService.currentGame.description = this.gameForm.get('gameDescription').value.trim();
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
