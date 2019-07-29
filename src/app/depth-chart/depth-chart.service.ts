import { Injectable } from '@angular/core';
import { DepthChartListItem } from './depth-chart-list-item';

@Injectable({
  providedIn: 'root'
})
export class DepthChartService {
  players: DepthChartListItem[];
  pairings: DepthChartListItem[];

  constructor() {
    this.players = [
      { name: 'John' },
      { name: 'Jake' },
      { name: 'Logan' },
      { name: 'Braeden' }
    ];
    this.pairings = [];
    this.generatePairings();
  }

  getPlayers(): DepthChartListItem[] {
    return this.players;
  }

  getPairings(): DepthChartListItem[] {
    return this.pairings;
  }

  addPlayer(newName: string): void {
    this.players.push({ name: newName });
    this.generatePairings();
  }

  deletePlayer(index: number): void {
    this.players.splice(index, 1);
    this.generatePairings();
  }

  generatePairings(): void {
    this.clearArray(this.pairings);

    for (let i = 0; i < this.players.length - 1; i++) {
      for (let j = i + 1; j < this.players.length; j++) {
        const pairing = this.players[i].name + '/' + this.players[j].name;
        this.pairings.push({ name: pairing });
      }
    }
  }

  clearAll(): void {
    this.clearArray(this.players);
    this.clearArray(this.pairings);
  }

  clearArray(array: DepthChartListItem[]): void {
    array.splice(0, array.length);
  }
}
