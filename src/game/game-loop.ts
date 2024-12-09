import { TwdCanvasState } from "./canvas-state";
import { TowerDefenseGrid } from "./grid";


export class GameLoop {
	public paused: boolean;
    public speed: number;
	public delta: number;

    private deltaCalc: number | undefined;
    private then: number;
    private dt: number;
    private accumulator: number;
    private fps: number;
    private lastRefresh: number;

    private grid: TowerDefenseGrid;

    private mainCtx: CanvasRenderingContext2D;
    private canvasState: TwdCanvasState;

    constructor(grid: TowerDefenseGrid, canvasState: TwdCanvasState ) {
        this.grid = grid;

        this.delta = (1000 / 60) / 1000;
        this.then = new Date().getTime();
        this.speed = 1;
        this.dt = (1000 / 60) / 1000;
        this.accumulator = 0.0;
        this.paused = false;
	

	    this.fps = (1000 / 120) / 1000;
	    this.lastRefresh = 0;

        this.mainCtx = canvasState.mainCtx;
        this.canvasState = canvasState;
    }

    public draw()
	{
		if(!this.paused)
		{
			//console.log(twdGameLoop.this.speed);
			var now = new Date().getTime();
			this.deltaCalc = (now - this.then) / 1000 ;


			this.lastRefresh += this.deltaCalc;

			//If code is paused minimum is 2FPS.
			if(this.deltaCalc > 0.5)
			{
				this.deltaCalc = 0.5;
			}

			this.then = now;

			this.accumulator += this.deltaCalc;
			
			while (this.accumulator >= this.dt )
		    {
		    	this.accumulator -= this.dt;

		    	this.grid.calculateTurrets();
				this.grid.calculateEnemies();
				this.grid.calculateBullets();
				this.grid.calculateExplosions();
		    }
	    }	    

	    if(this.lastRefresh > this.fps)
	    {
		    //console.log(deltaCalc);
		    this.lastRefresh = 0;
            this.mainCtx.clearRect(0, 0, this.canvasState.mainCanvas.width, this.canvasState.mainCanvas.height);

            this.mainCtx.beginPath();
            this.mainCtx.rect(0, 0, this.canvasState.mainCanvas.width, this.canvasState.mainCanvas.height);
            this.mainCtx.fillStyle = "grey";
            this.mainCtx.fill();

			

			this.grid.draw();
			//console.log("Draw!");

			this.grid.drawAssets();
			this.grid.drawTurrets();
			this.grid.drawEnemies();
			this.grid.drawExplosions();
			this.grid.drawBullets();
			
		}

		requestAnimationFrame(this.draw.bind(this));
	}

    public start(): void {
		this.draw();				
	};

    public changeSpeed(): void
	{
		this.speed = this.speed != 4 ? (this.speed+1) : 1;
		this.dt = (1000 / (60 * this.speed)) / 1000;
	}

    public changePause(): void
	{
		this.paused = this.paused ? false : true;
	}
}