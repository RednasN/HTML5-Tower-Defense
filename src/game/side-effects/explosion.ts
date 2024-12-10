import { TwdCanvasState } from "../canvas-state";
import { TowerDefenseGrid } from "../grid";
import { TowerDefenseImages } from "../images";

export class Explosion {
	private explosion_length: number;
	private tics_per_frame: number;
	private current_tick: number;
	private explosion_index: number;
	private explosion_list_index: number;
	private drawx: number;
	private drawy: number;

	private twdGrid: TowerDefenseGrid;
	private twdImages: TowerDefenseImages;
	private canvasState: TwdCanvasState;

	
	constructor(canvasState: TwdCanvasState, twdImages: TowerDefenseImages, twdGrid: TowerDefenseGrid, x: number, y: number, explosionIndex: number) {
		this.twdGrid = twdGrid;
		this.twdImages = twdImages;
		this.canvasState = canvasState;

		this.explosion_length = twdImages.explosions[explosionIndex].images.length;
		this.tics_per_frame = 5;
		this.current_tick = 20;
	
		this.explosion_index = 0;
	
		this.explosion_list_index = explosionIndex;
	
		this.drawx = x;
		this.drawy = y;
	}

	public calculate(): void {

		if(this.explosion_index < this.explosion_length)
		{
			this.current_tick--;

			if(this.current_tick === 0)
			{
				this.explosion_index++;
				this.current_tick = this.tics_per_frame;
			}
		}
	}

	public draw() {
    	if(this.explosion_index < this.explosion_length)
    	{
    		this.twdGrid.render(this.twdImages.explosions[this.explosion_list_index].images[this.explosion_index], Math.round(this.drawx) + this.canvasState.mainCanvasXOffset, Math.round(this.drawy) + this.canvasState.mainCanvasYOffset);
    	}
	}
}
