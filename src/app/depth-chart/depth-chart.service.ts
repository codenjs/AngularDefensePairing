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
    this.updatePairings();
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
    this.updatePairings();
    this.saveData();
  }

  deletePlayer(index: number): void {
    this.players.splice(index, 1);
    this.updatePairings();
    this.saveData();
  }

  movePlayer(args: DepthChartMoveEventArgs) {
    moveItemInArray(this.players, args.sourceIndex, args.destinationIndex);
    this.updatePairings();
    this.saveData();
  }

  updatePairings(): void {
    this.clearArray(this.pairings);
    this.generatePairings(this.players).forEach(p => {
      this.pairings.push(p);
    });
  }

  generatePairings(players: ListItem[]): ListItem[] {
    const pairings: ListItem[] = [];

    for (let i = 0; i < players.length - 1; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const pairing = players[i].name + '/' + players[j].name;
        pairings.push({ name: pairing });
      }
    }

    return pairings;
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
