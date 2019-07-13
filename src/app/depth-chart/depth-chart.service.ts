import { Injectable } from '@angular/core';
import { DepthChartListItem } from './depth-chart-list-item';

@Injectable({
  providedIn: 'root'
})
export class DepthChartService {
  players: DepthChartListItem[];

  constructor() {
    this.players = [
      { name: 'Claude' },
      { name: 'John' },
      { name: 'Jake' },
      { name: 'Deckard' },
      { name: 'Logan' },
      { name: 'Braeden' }
    ];
  }

  getPlayers(): DepthChartListItem[] {
    return this.players;
  }

  addPlayer(newName: string): void {
    this.players.push({ name: newName });
  }
}
