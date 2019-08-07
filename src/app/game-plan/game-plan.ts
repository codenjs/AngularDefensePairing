import { ListItem } from '../shared/list-item';

export class GamePlan {
  static periodIndex = [0, 1, 2];
  description: string;
  periods: ListItem[][] = [];

  constructor() {
    GamePlan.periodIndex.forEach(_ => {
      this.periods.push([]);
    });
  }
}
