import { Injectable } from '@angular/core';
import { DepthChartListItem } from '../depth-chart/depth-chart-list-item';

@Injectable({
  providedIn: 'root'
})
export class GamePlanService {
  periods = [0, 1, 2];
  games: DepthChartListItem[];
  selectedPairings: DepthChartListItem[][];

  constructor() {
    this.games = [];
    this.selectedPairings = [];
    this.periods.forEach(_ => {
      this.selectedPairings.push([]);
    });
  }

  getGames(): DepthChartListItem[] {
    return this.games;
  }

  addGame(newName: string): void {
    this.games.push({ name: newName });
  }

  getAllSelectedPairings(): DepthChartListItem[] {
    return this.selectedPairings.reduce((a, b) => a.concat(b));
  }

  getSelectedPairingsByPeriod(period: number): DepthChartListItem[] {
    return this.selectedPairings[period];
  }

  addPairing(period: number, pairing: DepthChartListItem): void {
    this.selectedPairings[period].push(pairing);
    this.selectedPairings[period].sort((a, b) => a.value - b.value);
  }

  deletePairing(period: number, pairingValue: number): void {
    const index = this.selectedPairings[period].findIndex(p => p.value === pairingValue);
    this.selectedPairings[period].splice(index, 1);
  }
}
