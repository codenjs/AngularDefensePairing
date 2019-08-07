import { Injectable } from '@angular/core';
import { GamePlan } from '../game-plan/game-plan';
import { ListItem } from './list-item';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private dataStoreKeys = {
    players: 'players',
    gamePlans: 'gamePlans'
  };

  fetchPlayers(): ListItem[] {
    const data = localStorage.getItem(this.dataStoreKeys.players);
    return JSON.parse(data) || [];
  }

  savePlayers(players: ListItem[]): void {
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
