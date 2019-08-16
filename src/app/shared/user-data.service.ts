import { Injectable } from '@angular/core';
import { GamePlan } from '../game-plan/game-plan';
import { ListItem } from './list-item';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private dataStoreKeys = {
    players: 'players',
    gamePlans: 'gamePlans'
  };

  constructor(private logService: LogService) { }

  fetchPlayers(): ListItem[] {
    const data = localStorage.getItem(this.dataStoreKeys.players);
    return JSON.parse(data) || [];
  }

  savePlayers(players: ListItem[]): void {
    const data = JSON.stringify(players);
    localStorage.setItem(this.dataStoreKeys.players, data);
    this.logService.Log(this.dataStoreKeys.players, data);
  }

  fetchGamePlans(): GamePlan[] {
    const data = localStorage.getItem(this.dataStoreKeys.gamePlans);
    return JSON.parse(data) || [];
  }

  saveGamePlans(gamePlans: GamePlan[]) {
    const data = JSON.stringify(gamePlans);
    localStorage.setItem(this.dataStoreKeys.gamePlans, data);
    this.logService.Log(this.dataStoreKeys.gamePlans, data);
  }
}
