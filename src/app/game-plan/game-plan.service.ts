import { Injectable } from '@angular/core';
import { GamePlan } from './game-plan';
import { UserDataService } from '../shared/user-data.service';
import { ListItem } from '../shared/list-item';

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

  getGamePlanList(): ListItem[] {
    return this.games.map(g => new ListItem(g.description));
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
    this.games.sort((a, b) => a.description.localeCompare(b.description));
    this.userDataService.saveGamePlans(this.games);
  }

  deleteGamePlan(id: number) {
    this.games.splice(id, 1);
    this.userDataService.saveGamePlans(this.games);
  }

  getAllSelectedPairings(): ListItem[] {
    return this.currentGame.periods.reduce((a, b) => a.concat(b));
  }

  getSelectedPairingsByPeriod(period: number): ListItem[] {
    return this.currentGame.periods[period];
  }

  addPairing(period: number, pairing: ListItem): void {
    this.currentGame.periods[period].push(pairing);
    this.currentGame.periods[period].sort((a, b) => a.value - b.value);
  }

  deletePairing(period: number, pairingValue: number): void {
    const index = this.currentGame.periods[period].findIndex(p => p.value === pairingValue);
    this.currentGame.periods[period].splice(index, 1);
  }
}
