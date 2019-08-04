import { DepthChartListItem } from '../depth-chart/depth-chart-list-item';

export class GamePlan {
  static periodIndex = [0, 1, 2];
  description: string;
  periods: DepthChartListItem[][] = [];

  constructor() {
    GamePlan.periodIndex.forEach(_ => {
      this.periods.push([]);
    });
  }
}
