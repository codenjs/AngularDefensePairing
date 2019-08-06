import { Injectable } from '@angular/core';
import { DepthChartListItem } from '../depth-chart/depth-chart-list-item';
import { GamePlan } from './game-plan';
import { UserDataService } from '../shared/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class GamePlanService {
  periods = GamePlan.periodIndex;
  games: GamePlan[];
  currentGame: GamePlan;

  constructor(private userDataService: UserDataService) {
    this.games = this.userDataService.fetchGamePlans();
  }

  getGamePlanList(): DepthChartListItem[] {
    return this.games.map(g => new DepthChartListItem(g.description));
  }

  loadGamePlan(id: number) {
    if (id === -1) {
      this.currentGame = new GamePlan();
    } else {
      this.games = this.userDataService.fetchGamePlans();
      this.currentGame = this.games[id];
    }
  }

  saveGamePlan(id: number) {
    if (id === -1) {
      this.games.push(this.currentGame);
    } else {
      this.games[id] = this.currentGame;
    }
    this.userDataService.saveGamePlans(this.games);
  }

  deleteGamePlan(id: number) {
    this.games.splice(id, 1);
    this.userDataService.saveGamePlans(this.games);
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
