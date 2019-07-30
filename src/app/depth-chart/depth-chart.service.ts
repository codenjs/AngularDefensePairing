import { Injectable } from '@angular/core';
import { DepthChartListItem, DepthChartMoveEventArgs } from './depth-chart-list-item';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class DepthChartService {
  players: DepthChartListItem[];
  pairings: DepthChartListItem[];
  dataStoreKey = 'data';

  constructor() {
    this.players = this.fetchData();
    this.pairings = [];
    this.generatePairings();
  }

  private fetchData(): DepthChartListItem[] {
    const data = localStorage.getItem(this.dataStoreKey);
    return data ? JSON.parse(data).players : [];
  }

  private saveData(): void {
    const data = { players: this.players };
    localStorage.setItem(this.dataStoreKey, JSON.stringify(data));
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
    this.saveData();
  }

  deletePlayer(index: number): void {
    this.players.splice(index, 1);
    this.generatePairings();
    this.saveData();
  }

  movePlayer(args: DepthChartMoveEventArgs) {
    moveItemInArray(this.players, args.sourceIndex, args.destinationIndex);
    this.generatePairings();
    this.saveData();
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
    this.saveData();
  }

  private clearArray(array: DepthChartListItem[]): void {
    array.splice(0, array.length);
  }
}
