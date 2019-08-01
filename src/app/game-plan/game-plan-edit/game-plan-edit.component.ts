import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { GamePlanService } from '../game-plan.service';

@Component({
  selector: 'app-game-plan-edit',
  templateUrl: './game-plan-edit.component.html',
  styleUrls: ['./game-plan-edit.component.css']
})
export class GamePlanEditComponent implements OnInit {
  gameForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private gamePlanService: GamePlanService) { }

  ngOnInit() {
    this.gameForm = this.formBuilder.group({
      gameDescription: ['']
    }, {
      updateOn: 'submit'
    });
  }

  onSubmit(): void {
    const gameDescription = this.gameForm.get('gameDescription').value;
    this.gamePlanService.addGame(gameDescription);
    this.router.navigate(['']);
  }
}
