import { Injectable } from '@angular/core';
import { DepthChartListItem } from '../depth-chart/depth-chart-list-item';

@Injectable({
  providedIn: 'root'
})
export class GamePlanService {
  games: DepthChartListItem[];
  selectedPairings: DepthChartListItem[];

  constructor() {
    this.games = [];
    this.selectedPairings = [];
  }

  getGames(): DepthChartListItem[] {
    return this.games;
  }

  addGame(newName: string): void {
    this.games.push({ name: newName });
  }

  getSelectedPairings(): DepthChartListItem[] {
    return this.selectedPairings;
  }
}
