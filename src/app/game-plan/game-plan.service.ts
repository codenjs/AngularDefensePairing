import { Injectable } from '@angular/core';
import { DepthChartListItem } from '../depth-chart/depth-chart-list-item';
import { GamePlan } from './game-plan';

@Injectable({
  providedIn: 'root'
})
export class GamePlanService {
  periods = GamePlan.periodIndex;
  games: GamePlan[];
  currentGame: GamePlan;

  constructor() {
    this.games = [];
    this.currentGame = new GamePlan();
  }

  getGamePlanList(): DepthChartListItem[] {
    return this.games.map(g => new DepthChartListItem(g.description));
  }

  addGamePlan(newDescription: string): void {
    this.currentGame.description = newDescription;

    this.games.push(this.currentGame);

    this.currentGame = new GamePlan();
  }

  getAllSelectedPairings(): DepthChartListItem[] {
    return this.currentGame.periods.reduce((a, b) => a.concat(b));
  }

  getSelectedPairingsByPeriod(period: number): DepthChartListItem[] {
    return this.currentGame.periods[period];
  }

  addPairing(period: number, pairing: DepthChartListItem): void {
    this.currentGame.periods[period].push(pairing);
    this.currentGame.periods[period].sort((a, b) => a.value - b.value);
  }

  deletePairing(period: number, pairingValue: number): void {
    const index = this.currentGame.periods[period].findIndex(p => p.value === pairingValue);
    this.currentGame.periods[period].splice(index, 1);
  }
}
