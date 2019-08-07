import { Injectable } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';

import { DepthChartMoveEventArgs } from './depth-chart-move-event-args';
import { UserDataService } from '../shared/user-data.service';
import { ListItem } from '../shared/list-item';

@Injectable({
  providedIn: 'root'
})
export class DepthChartService {
  players: ListItem[];
  pairings: ListItem[];

  constructor(private userDataService: UserDataService) {
    this.players = this.userDataService.fetchPlayers();
    this.pairings = [];
    this.generatePairings();
  }

  private saveData(): void {
    this.userDataService.savePlayers(this.players);
  }

  getPlayers(): ListItem[] {
    return this.players;
  }

  getPairings(): ListItem[] {
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

  private clearArray(array: ListItem[]): void {
    array.splice(0, array.length);
  }
}
