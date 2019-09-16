export class ExpansionPanelPreview {
  private isPanelOpen: boolean;

  constructor(private textGeneratorFunc: () => string) { }

  public toggle(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }

  public previewText(): string {
    return this.isPanelOpen ? '' : this.textGeneratorFunc();
  }
}
