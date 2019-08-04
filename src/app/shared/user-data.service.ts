import { Injectable } from '@angular/core';
import { DepthChartListItem } from '../depth-chart/depth-chart-list-item';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private dataStoreKeys = {
    players: 'players'
  };

  fetchPlayers(): DepthChartListItem[] {
    const data = localStorage.getItem(this.dataStoreKeys.players);
    return JSON.parse(data) || [];
  }

  savePlayers(players: DepthChartListItem[]): void {
    localStorage.setItem(this.dataStoreKeys.players, JSON.stringify(players));
  }
}
