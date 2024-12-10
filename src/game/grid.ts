import { Cell } from "../models/grid";
import { TwdCanvasState } from "./canvas-state";
import { TowerDefenseImages } from "./images";

export class TowerDefenseGrid {
	public selectedCell: Cell | null = null;
    public grid: Cell[][] = [];
	public turrets: any[] = [];
	public explosions: any[] = [];

	public enemies: any[] = [];
    public bullets: any[] = [];

    public route: Cell[] = [];
	

    private grid_height: number | null = null;
    private grid_width: number | null = null;

    private mainCtx: CanvasRenderingContext2D;   
    

    public money: number = 100;

    private mode: string = "Canvas"; //Canvas

    private startx: number | null = null;
    private starty: number | null = null;
    private endx: number | null = null;
    private endy: number | null = null;
    private widthx = 0;
    private widthy = 0;
    private height = 0;
    private width = 0;

    private images: TowerDefenseImages;

    private canvasState: TwdCanvasState;


    constructor(images: TowerDefenseImages, canvasState: TwdCanvasState) {
        this.mainCtx = canvasState.mainCtx;
        this.images = images;
        this.canvasState = canvasState;
    }

    public setupLevelOne(): void {
        this.widthx = 50;
        this.widthy = 50;
        this.height = 50;
        this.width = 50;

        this.grid = fixedGrid;
        this.route = fixedRoute;

        this.route = this.route.reverse();

		for (var x = 0; x < 15; x++) {
			this.turrets[x] = [];
			for (var y = 0; y < 15; y++) {

				this.turrets[x][y] = null;
			}
		}
    }

    public calculateTurrets(): void
	{
		for (let x = 0; x < this.turrets.length; x++) {
			for (let y = 0; y < this.turrets[x].length; y++) {
            	
				if(this.turrets[x][y] != null)
				{
            		this.turrets[x][y].calculate();
            	}
            }
        }
	}

    public calculateEnemies(): void
	{
		for (let x = 0; x < this.enemies.length; x++) {
			this.enemies[x].calculate();
        }
	}

	public calculateExplosions(): void
	{
		for (let x = 0; x < this.explosions.length; x++) {
			this.explosions[x].calculate();
        }
	}


	public calculateBullets(): void
	{
		for (let x = 0; x < this.bullets.length; x++) {
            this.bullets[x].calculate();
        }
	}

    public drawAssets(): void
	{
		if(this.selectedCell != null)
		{
			var drawAssetx = this.selectedCell.drawx + this.canvasState.mainCanvasXOffset;
	  		var drawAssety = this.selectedCell.drawy + this.canvasState.mainCanvasYOffset;
	  
			this.render(this.images.imgSurrounder, drawAssetx, drawAssety);
		}
	}

    public drawBullets(): void
	{
		for (let x = 0; x < this.bullets.length; x++) {
            this.bullets[x].draw();
        }
	}

    public drawTurrets(): void
	{
		for (let x = 0; x < this.turrets.length; x++) {
			for (let y = 0; y < this.turrets[x].length; y++) {
            	
				if(this.turrets[x][y] != null)
				{
            		this.turrets[x][y].draw();
            	}
            }
        }
	}

    public drawExplosions(): void
	{
		for (let x = 0; x < this.explosions.length; x++) {
			this.explosions[x].draw();
        }
	}

    public drawEnemies(): void
	{
		for (let x = 0; x < this.enemies.length; x++) {
			this.enemies[x].draw();
        }
	}

    public draw(): void
	{	
		if(this.grid_width == null && this.grid_height == null)
		{
			this.grid_width = this.grid[0].length;
			this.grid_height = this.grid.length
		}

        if(this.grid_height != null && this.grid_width != null) {
            for (let x = 0; x < this.grid_width; x++) {
                for (let y = 0; y < this.grid_height; y++) {   
                    
                    const imageIndex = this.grid[x][y].imageIndex;

                    if(imageIndex !== null) {
                        this.images.gridImages[imageIndex];
                        this.render(this.images.gridImages[imageIndex], this.grid[x][y].drawx + this.canvasState.mainCanvasXOffset, this.grid[x][y].drawy + this.canvasState.mainCanvasYOffset);    
                    }                    
                }
            }
        }
    }

    public neighbours(position : Cell, endPosition: Cell) {
		this.grid[position.x][position.y].done = true;

		const neighbourList : Cell[] = []
		if (this.grid[position.x - 1] != undefined && !this.grid[position.x - 1][position.y].done) {
			neighbourList.push(this.grid[position.x - 1][position.y]);
		}

		if (this.grid[position.x + 1] != undefined && !this.grid[position.x + 1][position.y].done) {
			neighbourList.push(this.grid[position.x + 1][position.y]);
		}

		if (this.grid[position.y + 1] != undefined && !this.grid[position.x][position.y + 1].done) {
			neighbourList.push(this.grid[position.x][position.y + 1]);
		}

		if (this.grid[position.y - 1] != undefined && !this.grid[position.x][position.y - 1].done) {
			neighbourList.push(this.grid[position.x][position.y - 1]);
		}

		neighbourList.forEach(function(_, i) {
			neighbourList[i].parentcell = position;

			if (neighbourList[i].y > endPosition.y) {
				neighbourList[i].steps += neighbourList[i].y - endPosition.y;
			}

			if (neighbourList[i].y < endPosition.y) {
				neighbourList[i].steps += endPosition.y - neighbourList[i].y;
			}

			if (neighbourList[i].x > endPosition.x) {
				neighbourList[i].steps += neighbourList[i].x - endPosition.x;
			}

			if (neighbourList[i].x < endPosition.x) {
				neighbourList[i].steps += endPosition.x - neighbourList[i].x;
			}

		});

        return neighbourList;
	}

    public colorRoute(cell: Cell): void {
		this.route.push(cell);
		if (cell.parentcell != null) {
			cell.cellcolor = "blue";
			
			this.colorRoute(cell.parentcell);
		}
	}

    public render(image : CanvasImageSource | null, x: number, y: number): void
	{
        if(image !== null) {
            this.mainCtx.drawImage(image, x, y);
        }
	}

    public initGrid(): void
	{
		for (let x = 0; x < this.widthx; x++) {
			const gridRow : Cell[] = [];

			this.turrets[x] = [];
			for (let y = 0; y < this.widthy; y++) {

				const cell: Cell = {
                    x: x,
                    y: y,
                    drawx: this.width * x,
                    drawy: this.height * y,
                    width: this.width,
                    steps: 0,
                    height: this.height,
                    done: false,
                    parentcell: null,
                    placeHolder: null,
                    cellcolor: "grey",
                    imageIndex: null
                };

				gridRow.push(cell);

			}
			this.grid.push(gridRow);
		}
	}
}

const fixedRoute = JSON.parse('[{"x":2,"y":1,"drawx":100,"drawy":50,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":2,"drawx":100,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":3,"drawx":100,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":4,"drawx":100,"drawy":200,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":5,"drawx":100,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":6,"drawx":100,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":7,"drawx":100,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":8,"drawx":100,"drawy":400,"width":50,"height":50,"imageIndex":"12"},{"x":3,"y":8,"drawx":150,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":4,"y":8,"drawx":200,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":5,"y":8,"drawx":250,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":8,"drawx":300,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":8,"drawx":350,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":8,"y":8,"drawx":400,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":9,"y":8,"drawx":450,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":10,"y":8,"drawx":500,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":8,"drawx":550,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":12,"y":8,"drawx":600,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":13,"y":8,"drawx":650,"drawy":400,"width":50,"height":50,"imageIndex":"11"},{"x":13,"y":7,"drawx":650,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":6,"drawx":650,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":5,"drawx":650,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":4,"drawx":650,"drawy":200,"width":50,"height":50,"imageIndex":"10"},{"x":12,"y":4,"drawx":600,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":4,"drawx":550,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":10,"y":4,"drawx":500,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":9,"y":4,"drawx":450,"drawy":200,"width":50,"height":50,"imageIndex":"8"},{"x":8,"y":4,"drawx":400,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":4,"drawx":350,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":4,"drawx":300,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":4,"drawx":250,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":4,"y":4,"drawx":200,"drawy":200,"width":50,"height":50,"imageIndex":"12"},{"x":4,"y":3,"drawx":200,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":2,"drawx":200,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":1,"drawx":200,"drawy":50,"width":50,"height":50,"imageIndex":"9"},{"x":5,"y":1,"drawx":250,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":1,"drawx":300,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":1,"drawx":350,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":1,"drawx":400,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":9,"y":1,"drawx":450,"drawy":50,"width":50,"height":50,"imageIndex":"10"},{"x":9,"y":2,"drawx":450,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":3,"drawx":450,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":4,"drawx":450,"drawy":200,"width":50,"height":50,"imageIndex":"8"},{"x":9,"y":5,"drawx":450,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":6,"drawx":450,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":7,"drawx":450,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":8,"drawx":450,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":9,"y":9,"drawx":450,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":10,"drawx":450,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":11,"drawx":450,"drawy":550,"width":50,"height":50,"imageIndex":"11"},{"x":8,"y":11,"drawx":400,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":11,"drawx":350,"drawy":550,"width":50,"height":50,"imageIndex":"8"},{"x":6,"y":11,"drawx":300,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":11,"drawx":250,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":4,"y":11,"drawx":200,"drawy":550,"width":50,"height":50,"imageIndex":"12"},{"x":4,"y":10,"drawx":200,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":9,"drawx":200,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":8,"drawx":200,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":4,"y":7,"drawx":200,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":6,"drawx":200,"drawy":300,"width":50,"height":50,"imageIndex":"9"},{"x":5,"y":6,"drawx":250,"drawy":300,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":6,"drawx":300,"drawy":300,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":6,"drawx":350,"drawy":300,"width":50,"height":50,"imageIndex":"10"},{"x":7,"y":7,"drawx":350,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":8,"drawx":350,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":7,"y":9,"drawx":350,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":10,"drawx":350,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":11,"drawx":350,"drawy":550,"width":50,"height":50,"imageIndex":"8"},{"x":7,"y":12,"drawx":350,"drawy":600,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":13,"drawx":350,"drawy":650,"width":50,"height":50,"imageIndex":"12"},{"x":8,"y":13,"drawx":400,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":9,"y":13,"drawx":450,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":10,"y":13,"drawx":500,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":13,"drawx":550,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":12,"y":13,"drawx":600,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":13,"y":13,"drawx":650,"drawy":650,"width":50,"height":50,"imageIndex":"11"},{"x":13,"y":12,"drawx":650,"drawy":600,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":11,"drawx":650,"drawy":550,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":10,"drawx":650,"drawy":500,"width":50,"height":50,"imageIndex":"14"}]') as Cell[];


const fixedGrid = JSON.parse('[[{"x":0,"y":0,"drawx":0,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":1,"drawx":0,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":2,"drawx":0,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":3,"drawx":0,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":4,"drawx":0,"drawy":200,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":5,"drawx":0,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":6,"drawx":0,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":7,"drawx":0,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":8,"drawx":0,"drawy":400,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":9,"drawx":0,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":10,"drawx":0,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":11,"drawx":0,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":12,"drawx":0,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":13,"drawx":0,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":14,"drawx":0,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":1,"y":0,"drawx":50,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":1,"drawx":50,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":2,"drawx":50,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":3,"drawx":50,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":4,"drawx":50,"drawy":200,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":5,"drawx":50,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":6,"drawx":50,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":7,"drawx":50,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":8,"drawx":50,"drawy":400,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":9,"drawx":50,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":10,"drawx":50,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":11,"drawx":50,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":12,"drawx":50,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":13,"drawx":50,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":14,"drawx":50,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":2,"y":0,"drawx":100,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":1,"drawx":100,"drawy":50,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":2,"drawx":100,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":3,"drawx":100,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":4,"drawx":100,"drawy":200,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":5,"drawx":100,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":6,"drawx":100,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":7,"drawx":100,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":8,"drawx":100,"drawy":400,"width":50,"height":50,"imageIndex":"12"},{"x":2,"y":9,"drawx":100,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":10,"drawx":100,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":11,"drawx":100,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":12,"drawx":100,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":13,"drawx":100,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":14,"drawx":100,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":3,"y":0,"drawx":150,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":1,"drawx":150,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":2,"drawx":150,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":3,"drawx":150,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":4,"drawx":150,"drawy":200,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":5,"drawx":150,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":6,"drawx":150,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":7,"drawx":150,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":8,"drawx":150,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":3,"y":9,"drawx":150,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":10,"drawx":150,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":11,"drawx":150,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":12,"drawx":150,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":13,"drawx":150,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":14,"drawx":150,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":4,"y":0,"drawx":200,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":4,"y":1,"drawx":200,"drawy":50,"width":50,"height":50,"imageIndex":"9"},{"x":4,"y":2,"drawx":200,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":3,"drawx":200,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":4,"drawx":200,"drawy":200,"width":50,"height":50,"imageIndex":"12"},{"x":4,"y":5,"drawx":200,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":4,"y":6,"drawx":200,"drawy":300,"width":50,"height":50,"imageIndex":"9"},{"x":4,"y":7,"drawx":200,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":8,"drawx":200,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":4,"y":9,"drawx":200,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":10,"drawx":200,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":11,"drawx":200,"drawy":550,"width":50,"height":50,"imageIndex":"12"},{"x":4,"y":12,"drawx":200,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":4,"y":13,"drawx":200,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":4,"y":14,"drawx":200,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":5,"y":0,"drawx":250,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":1,"drawx":250,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":2,"drawx":250,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":3,"drawx":250,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":4,"drawx":250,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":5,"drawx":250,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":6,"drawx":250,"drawy":300,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":7,"drawx":250,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":8,"drawx":250,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":9,"drawx":250,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":10,"drawx":250,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":11,"drawx":250,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":12,"drawx":250,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":13,"drawx":250,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":14,"drawx":250,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":6,"y":0,"drawx":300,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":1,"drawx":300,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":2,"drawx":300,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":3,"drawx":300,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":4,"drawx":300,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":5,"drawx":300,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":6,"drawx":300,"drawy":300,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":7,"drawx":300,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":8,"drawx":300,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":9,"drawx":300,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":10,"drawx":300,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":11,"drawx":300,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":12,"drawx":300,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":13,"drawx":300,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":14,"drawx":300,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":7,"y":0,"drawx":350,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":7,"y":1,"drawx":350,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":2,"drawx":350,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":7,"y":3,"drawx":350,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":7,"y":4,"drawx":350,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":5,"drawx":350,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":7,"y":6,"drawx":350,"drawy":300,"width":50,"height":50,"imageIndex":"10"},{"x":7,"y":7,"drawx":350,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":8,"drawx":350,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":7,"y":9,"drawx":350,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":10,"drawx":350,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":11,"drawx":350,"drawy":550,"width":50,"height":50,"imageIndex":"8"},{"x":7,"y":12,"drawx":350,"drawy":600,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":13,"drawx":350,"drawy":650,"width":50,"height":50,"imageIndex":"12"},{"x":7,"y":14,"drawx":350,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":8,"y":0,"drawx":400,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":1,"drawx":400,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":2,"drawx":400,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":3,"drawx":400,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":4,"drawx":400,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":5,"drawx":400,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":6,"drawx":400,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":7,"drawx":400,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":8,"drawx":400,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":9,"drawx":400,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":10,"drawx":400,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":11,"drawx":400,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":12,"drawx":400,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":13,"drawx":400,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":14,"drawx":400,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":9,"y":0,"drawx":450,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":9,"y":1,"drawx":450,"drawy":50,"width":50,"height":50,"imageIndex":"10"},{"x":9,"y":2,"drawx":450,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":3,"drawx":450,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":4,"drawx":450,"drawy":200,"width":50,"height":50,"imageIndex":"8"},{"x":9,"y":5,"drawx":450,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":6,"drawx":450,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":7,"drawx":450,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":8,"drawx":450,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":9,"y":9,"drawx":450,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":10,"drawx":450,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":11,"drawx":450,"drawy":550,"width":50,"height":50,"imageIndex":"11"},{"x":9,"y":12,"drawx":450,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":9,"y":13,"drawx":450,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":9,"y":14,"drawx":450,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":10,"y":0,"drawx":500,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":1,"drawx":500,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":2,"drawx":500,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":3,"drawx":500,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":4,"drawx":500,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":10,"y":5,"drawx":500,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":6,"drawx":500,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":7,"drawx":500,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":8,"drawx":500,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":10,"y":9,"drawx":500,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":10,"drawx":500,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":11,"drawx":500,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":12,"drawx":500,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":13,"drawx":500,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":10,"y":14,"drawx":500,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":11,"y":0,"drawx":550,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":1,"drawx":550,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":2,"drawx":550,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":3,"drawx":550,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":4,"drawx":550,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":5,"drawx":550,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":6,"drawx":550,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":7,"drawx":550,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":8,"drawx":550,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":9,"drawx":550,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":10,"drawx":550,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":11,"drawx":550,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":12,"drawx":550,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":13,"drawx":550,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":14,"drawx":550,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":12,"y":0,"drawx":600,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":1,"drawx":600,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":2,"drawx":600,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":3,"drawx":600,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":4,"drawx":600,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":12,"y":5,"drawx":600,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":6,"drawx":600,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":7,"drawx":600,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":8,"drawx":600,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":12,"y":9,"drawx":600,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":10,"drawx":600,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":11,"drawx":600,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":12,"drawx":600,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":13,"drawx":600,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":12,"y":14,"drawx":600,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":13,"y":0,"drawx":650,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":13,"y":1,"drawx":650,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":13,"y":2,"drawx":650,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":13,"y":3,"drawx":650,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":13,"y":4,"drawx":650,"drawy":200,"width":50,"height":50,"imageIndex":"10"},{"x":13,"y":5,"drawx":650,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":6,"drawx":650,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":7,"drawx":650,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":8,"drawx":650,"drawy":400,"width":50,"height":50,"imageIndex":"11"},{"x":13,"y":9,"drawx":650,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":13,"y":10,"drawx":650,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":11,"drawx":650,"drawy":550,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":12,"drawx":650,"drawy":600,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":13,"drawx":650,"drawy":650,"width":50,"height":50,"imageIndex":"11"},{"x":13,"y":14,"drawx":650,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":14,"y":0,"drawx":700,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":1,"drawx":700,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":2,"drawx":700,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":3,"drawx":700,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":4,"drawx":700,"drawy":200,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":5,"drawx":700,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":6,"drawx":700,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":7,"drawx":700,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":8,"drawx":700,"drawy":400,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":9,"drawx":700,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":10,"drawx":700,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":11,"drawx":700,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":12,"drawx":700,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":13,"drawx":700,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":14,"drawx":700,"drawy":700,"width":50,"height":50,"imageIndex":"3"}]]') as Cell[][];
