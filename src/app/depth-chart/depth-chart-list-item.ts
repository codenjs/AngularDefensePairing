export class DepthChartListItem {
    name: string;
}

export class DepthChartMoveEventArgs {
    sourceIndex: number;
    destinationIndex: number;

    constructor(sourceIndex: number, destinationIndex: number) {
        this.sourceIndex = sourceIndex;
        this.destinationIndex = destinationIndex;
    }
}
