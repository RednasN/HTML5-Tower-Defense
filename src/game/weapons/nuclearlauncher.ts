import { TwdCanvasState } from "../canvas-state";
import { GameLoop } from "../game-loop";
import { TowerDefenseGrid } from "../grid";
import { TowerDefenseImages } from "../images";
import { NuclearBullet } from "../projectiles/nuclearbullet";
import { Weapon } from "./weapon";

export class NuclearLauncher extends Weapon {

    private twdImages: TowerDefenseImages;

	constructor(twdImages: TowerDefenseImages, canvasState: TwdCanvasState, twdGrid: TowerDefenseGrid, twdGameLoop: GameLoop, x: number, y: number, imageIndex: number)
    {
        super(canvasState, twdGrid, twdGameLoop, x, y, imageIndex);

        this.twdImages = twdImages;

        this.angle = Math.floor(Math.random() * (359 - 0 + 1) + 0);
    
        this.range = 1000;
        this.damage = 1000;
        this.speed = 1000; 
        this.locked = false; 
    }

    public shoot(): void {
        this.twdGrid.bullets.push(new NuclearBullet(this.twdGameLoop, this.canvasState, this.twdImages, this.twdGrid, this.gridX, this.gridY, this.focusedIndex, 2, this.damage));
    }

    public draw(): void {
        this.twdGrid.render(this.twdImages.towers[this.imageIndex].images[Math.round(this.angle)], this.startx!, this.starty!);
    }
}