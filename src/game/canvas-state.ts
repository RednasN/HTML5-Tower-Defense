export class TwdCanvasState {
    public mainCanvasXCurrent = 0;
    public mainCanvasYCurrent = 0;
    public mainCanvasXOffset = 0;
    public mainCanvasYOffset = 0;

    public drawScale = 1;

    public mainCanvas!: HTMLCanvasElement;
    public mainCtx!: CanvasRenderingContext2D;

    public scaleToFit = 1;
}