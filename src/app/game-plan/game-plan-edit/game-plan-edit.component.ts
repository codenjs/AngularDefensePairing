import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GamePlanService } from '../game-plan.service';
import { DepthChartService } from 'src/app/depth-chart/depth-chart.service';
import { ListItem } from 'src/app/shared/list-item';
import { ArrayUtils } from 'src/app/shared/array-utils';
import { UniqueCounter } from 'src/app/shared/unique-counter';
import { ExpansionPanelPreview } from 'src/app/shared/expansion-panel-preview';
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
  notesPanelPreview = new ExpansionPanelPreview(() => this.notes.value);
  depthChartPanelPreview = new ExpansionPanelPreview(() => this.players.map(i => i.name).join(', '));

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
      ]],
      notes: [this.gamePlanService.currentGame.notes, { updateOn: 'blur' }]
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
  get notes() { return this.gameForm.get('notes'); }

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

    this.gamePlanService.currentGame.description = this.gameDescription.value.trim();
    this.gamePlanService.currentGame.notes = this.notes.value;
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
