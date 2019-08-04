export class DepthChartListItem {
    name: string;
    value?: number;

    constructor(name?: string) {
        this.name = name;
    }
}

export class DepthChartMoveEventArgs {
    sourceIndex: number;
    destinationIndex: number;

    constructor(sourceIndex: number, destinationIndex: number) {
        this.sourceIndex = sourceIndex;
        this.destinationIndex = destinationIndex;
    }
}
