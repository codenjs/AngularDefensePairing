export class UniqueCounter<T, TKey> {
  private counts = new Map<TKey, number>();

  setCounts(items: T[], keySelector: (item: T) => TKey) {
    this.counts = new Map<TKey, number>();

    items.forEach(item => {
      const key = keySelector(item);
      const newCount = this.counts.has(key) ? this.counts.get(key) + 1 : 1;
      this.counts.set(key, newCount);
    });
  }

  getCount(key: TKey): number {
    return this.counts.get(key) || 0;
  }
}
