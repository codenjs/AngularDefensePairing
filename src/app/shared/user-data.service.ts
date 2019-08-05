import { Injectable } from '@angular/core';
import { DepthChartListItem } from '../depth-chart/depth-chart-list-item';
import { GamePlan } from '../game-plan/game-plan';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private dataStoreKeys = {
    players: 'players',
    gamePlans: 'gamePlans'
  };

  fetchPlayers(): DepthChartListItem[] {
    const data = localStorage.getItem(this.dataStoreKeys.players);
    return JSON.parse(data) || [];
  }

  savePlayers(players: DepthChartListItem[]): void {
    localStorage.setItem(this.dataStoreKeys.players, JSON.stringify(players));
  }

  fetchGamePlans(): GamePlan[] {
    const data = localStorage.getItem(this.dataStoreKeys.gamePlans);
    return JSON.parse(data) || [];
  }

  saveGamePlans(gamePlans: GamePlan[]) {
    localStorage.setItem(this.dataStoreKeys.gamePlans, JSON.stringify(gamePlans));
  }
}
